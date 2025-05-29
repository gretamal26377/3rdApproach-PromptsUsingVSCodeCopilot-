FROM python:3.9-slim-buster

# This is default ARG if it's not set in docker-compose.yml.
# If Dockerfile is run directly, it will use "customer" as default ARG
# Notice: In Dockerfiles can't have inline comments, just above or below the code
# var definition available at build-time (for Docker build)
ARG BACKEND_TYPE=customer
# var definition available at runtime (for Docker run)
ENV BACKEND_TYPE=${BACKEND_TYPE}
# You need both to pass the value from build-time into the running container

WORKDIR /marketplace-pwa/backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD ["sh", "-c", "if [ \"$BACKEND_TYPE\" = 'admin' ]; then python app/admin/admin_routes.py; else python app/customer/customer_routes.py; fi"]
