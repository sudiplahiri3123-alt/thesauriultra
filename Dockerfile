FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
  bash \
  openssl \
  libncurses6 \
  libstdc++6 \
  curl \
  ca-certificates \
  wget \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN chmod +x ./run.sh ./stop.sh ./restart.sh ./wordnet_service/bin/wordnet_service

EXPOSE 4000

CMD ["./run.sh"]
