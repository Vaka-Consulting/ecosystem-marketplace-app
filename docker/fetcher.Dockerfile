# Use the official AWS Lambda Python base image.
FROM public.ecr.aws/lambda/python

# Copy Python files from 'packages/policy-asset-fetcher' to the image's working directory.
COPY packages/policy-asset-fetcher/*.py .

# Copy the requirements.txt file.
COPY packages/policy-asset-fetcher/requirements.txt .

# Install Python dependencies, avoiding the cache.
RUN pip install --no-cache-dir -r requirements.txt

# Set the command to run the Lambda function.
CMD [ "python", "./main.py" ]