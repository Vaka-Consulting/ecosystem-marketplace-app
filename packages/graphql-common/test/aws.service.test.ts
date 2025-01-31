import { SQS, SendMessageCommand } from "@aws-sdk/client-sqs";
import { SSM, GetParameterCommand } from "@aws-sdk/client-ssm";
import { InvocationType, InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import {
  SFNClient,
  StartExecutionCommand,
} from "@aws-sdk/client-sfn";

import { mockClient } from "aws-sdk-client-mock";
import { AWSService } from "../src/services/aws.service";

// Mock all AWS clients
const sqsMock = mockClient(SQS);
const ssmMock = mockClient(SSM);
const secretsManagerMock = mockClient(SecretsManagerClient);
const lambdaMock = mockClient(LambdaClient);
const sfnMock = mockClient(SFNClient);


// Mock the SSM client
describe('AWSService', () => {
  let awsService: AWSService;

  beforeEach(() => {
    awsService = new AWSService();
    // Reset all mocks before each test
    sqsMock.reset();
    ssmMock.reset();
    secretsManagerMock.reset();
    lambdaMock.reset();
    sfnMock.reset();
  });

  describe('startStepFunctionExec', () => {
    it('should start a Step Function execution', async () => {
      const sfnArn = 'arn:aws:states:us-east-1:123456789012:stateMachine:MyStateMachine';
      const input = JSON.stringify({ key: 'value' });
      const expectedResponse = { executionArn: 'executionArn', startDate: new Date() };

      sfnMock.on(StartExecutionCommand).resolves(expectedResponse);

      const result = await awsService.startStepFunctionExec(sfnArn, input);

      expect(result).toEqual(expectedResponse);
      expect(sfnMock.calls()).toHaveLength(1);
      expect(sfnMock.call(0).args[0].input).toEqual({
        stateMachineArn: sfnArn,
        input,
      });
    });
  });

  describe('invokeLambdaExec', () => {
    it('should invoke a Lambda function', async () => {
      const lambdaArn = 'arn:aws:lambda:us-east-1:123456789012:function:MyFunction';
      const payload = JSON.stringify({ key: 'value' });
      const expectedResponse = { StatusCode: 202 };

      lambdaMock.on(InvokeCommand).resolves(expectedResponse);

      const result = await awsService.invokeLambdaExec(lambdaArn, payload);

      expect(result).toEqual(expectedResponse);
      expect(lambdaMock.calls()).toHaveLength(1);
      expect(lambdaMock.call(0).args[0].input).toEqual({
        FunctionName: lambdaArn,
        Payload: payload,
        InvocationType: InvocationType.Event,
      });
    });
  });

  describe('getSSMParamValue', () => {
    it('should return the parameter value when it exists', async () => {
      const paramName = '/test/param';
      const paramValue = 'test-value';

      ssmMock.on(GetParameterCommand).resolves({
        Parameter: { Value: paramValue },
      });

      const result = await awsService.getSSMParamValue(paramName);

      expect(result).toBe(paramValue);
      expect(ssmMock.calls()).toHaveLength(1);
      expect(ssmMock.call(0).args[0].input).toEqual({
        Name: paramName,
        WithDecryption: false,
      });
    });

    it('should call getParameter with WithDecryption true when specified', async () => {
      const paramName = '/test/encrypted-param';
      const paramValue = 'decrypted-value';

      ssmMock.on(GetParameterCommand).resolves({
        Parameter: { Value: paramValue },
      });

      const result = await awsService.getSSMParamValue(paramName, true);

      expect(result).toBe(paramValue);
      expect(ssmMock.calls()).toHaveLength(1);
      expect(ssmMock.call(0).args[0].input).toEqual({
        Name: paramName,
        WithDecryption: true,
      });
    });
  });

  describe('getSecretManagerValue', () => {
    it('should return parsed secret string when available', async () => {
      const secretName = 'MySecret';
      const secretValue = { username: 'user', password: 'pass' };

      secretsManagerMock.on(GetSecretValueCommand).resolves({
        SecretString: JSON.stringify(secretValue),
      });

      const result = await awsService.getSecretManagerValue(secretName);

      expect(result).toEqual(secretValue);
      expect(secretsManagerMock.calls()).toHaveLength(1);
      expect(secretsManagerMock.call(0).args[0].input).toEqual({
        SecretId: secretName,
      });
    });

    it('should return secret binary when string is not available', async () => {
      const secretName = 'MyBinarySecret';
      const secretBinary = Buffer.from('binary-data');

      secretsManagerMock.on(GetSecretValueCommand).resolves({
        SecretBinary: secretBinary,
      });

      const result = await awsService.getSecretManagerValue(secretName);

      expect(result).toEqual(secretBinary);
      expect(secretsManagerMock.calls()).toHaveLength(1);
    });
  });

  describe('send', () => {
    it('should send a message to SQS', async () => {
      const messageBody = 'test message';
      const queueUrl = 'https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue';
      process.env.QUEUE_URL = queueUrl;

      const expectedResponse = { MessageId: '12345' };

      sqsMock.on(SendMessageCommand).resolves(expectedResponse);

      const result = await awsService.send(messageBody);

      expect(result).toEqual(expectedResponse);
      expect(sqsMock.calls()).toHaveLength(1);
      expect(sqsMock.call(0).args[0].input).toEqual({
        MessageBody: messageBody,
        QueueUrl: queueUrl,
      });
    });
  });
});