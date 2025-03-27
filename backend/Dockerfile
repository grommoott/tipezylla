FROM oven/bun:latest
WORKDIR /app
COPY ./package* ./
COPY ./bun* ./
COPY ./tsconfig* ./
COPY ./src ./
RUN bun install
CMD ["bun", "run", "nest", "start"]
