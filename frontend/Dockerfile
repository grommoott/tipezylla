FROM oven/bun:latest
WORKDIR /app
COPY ./package*.json ./
COPY ./bun* ./
COPY ./tsconfig* ./
COPY ./index.html ./
COPY ./vite.config.ts ./
COPY ./public ./
COPY ./src ./src
RUN bun install
RUN bun run build
CMD ["bun", "run", "host"]
