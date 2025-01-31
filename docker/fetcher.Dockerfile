FROM public.ecr.aws/lambda/python

COPY packages/policy-asset-fetcher/*.py .

COPY packages/policy-asset-fetcher/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "./main.py" ]