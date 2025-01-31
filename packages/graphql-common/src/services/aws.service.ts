// Importing various AWS SDK clients and commands.
// - SQS: For interacting with AWS Simple Queue Service (SQS).
// - SSM: For interacting with AWS Systems Manager (SSM).
// - LambdaClient: For invoking AWS Lambda functions.
// - SecretsManagerClient: For retrieving secrets from AWS Secrets Manager.
// - SFNClient: For interacting with AWS Step Functions.
import { SQS } from "@aws-sdk/client-sqs";
import { SSM } from "@aws-sdk/client-ssm";
import { InvocationType, InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
} from "@aws-sdk/client-sfn";

// AWSService class to manage AWS services interactions.
// This class initializes clients for:
// - SQS (Simple Queue Service)
// - SSM (Systems Manager)
// - Secrets Manager
// - Lambda
// - Step Functions
export class AWSService {
  sqsClient: SQS;
  ssmClient: SSM;
  smClient: SecretsManagerClient;
  lambdaClient: LambdaClient;
  stepFunctionClient: SFNClient;

  // The constructor initializes AWS service clients for the class.
  public constructor() {
    this.sqsClient = new SQS();
    this.ssmClient = new SSM();
    this.smClient = new SecretsManagerClient();
    this.stepFunctionClient = new SFNClient();
    this.lambdaClient = new LambdaClient();
  }

  // Function to start execution of a Step Function.
  // Parameters:
  // - sfnArn: The ARN of the state machine to execute.
  // - input: Input string to pass to the state machine.
  public async startStepFunctionExec(sfnArn, input: string) {
    const c: StartExecutionCommand = new StartExecutionCommand({
      stateMachineArn: sfnArn,
      input,
    } as StartExecutionCommandInput);
    return await this.stepFunctionClient.send(c);
  }

  // Function to invoke a Lambda function asynchronously.
  // Parameters:
  // - lambdaArn: The ARN of the Lambda function to invoke.
  // - payload: The payload string to send to the Lambda function.
  public async invokeLambdaExec(lambdaArn, payload: string) {
    console.log("Calling Lambda: ", payload);
    const c: InvokeCommand = new InvokeCommand({
      FunctionName: lambdaArn,
      Payload: payload,
      InvocationType: InvocationType.Event,
    });
    return await this.lambdaClient.send(c);
  }

  // Function to get a parameter value from SSM Parameter Store.
  // Parameters:
  // - param: The name of the parameter.
  // - withDecrypt: Boolean to indicate if the parameter should be decrypted.
  public async getSSMParamValue(param: string | undefined, withDecrypt = false) {
    const paramValue = await this.ssmClient.getParameter({
      Name: param,
      WithDecryption: withDecrypt,
    });
    return paramValue.Parameter?.Value;
  }

  // Function to get a secret value from AWS Secrets Manager.
  // Parameters:
  // - secretName: The name of the secret to retrieve.
  public async getSecretManagerValue(secretName: string | undefined) {
    const response = await this.smClient.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );
    if (response.SecretString) {
      return JSON.parse(response.SecretString);
    }
    if (response.SecretBinary) {
      return response.SecretBinary;
    }
  }

  // Function to send a message to an SQS queue.
  // Parameters:
  // - data: The message body to send to the queue.
  public async send(data: string) {
    return this.sqsClient.sendMessage({
      MessageBody: data,
      QueueUrl: process.env.QUEUE_URL,
    });
  }
}
