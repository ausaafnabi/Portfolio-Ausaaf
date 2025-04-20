export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  thumbnail: string
  tags: string[]
  publishedAt: string
  updatedAt: string
}

// Initial sample blog posts
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with CUDA C++ for GPU Computing",
    slug: "getting-started-with-cuda-cpp",
    description:
      "A beginner's guide to GPU programming with CUDA C++ and how to optimize your first parallel algorithms.",
    content: `
# Getting Started with CUDA C++ for GPU Computing

GPU computing has revolutionized the way we approach computationally intensive tasks. In this post, I'll share my experience getting started with CUDA C++ and how it can dramatically improve performance for parallel workloads.

## What is CUDA?

CUDA (Compute Unified Device Architecture) is NVIDIA's parallel computing platform and API model. It allows developers to use NVIDIA GPUs for general purpose processing, a technique known as GPGPU (General-Purpose computing on Graphics Processing Units).

## Setting Up Your Environment

First, you'll need to install the CUDA Toolkit from NVIDIA's website. This includes:

- CUDA compiler (nvcc)
- Libraries and header files
- Debugging and profiling tools

\`\`\`bash
# Check if CUDA is installed correctly
nvcc --version
\`\`\`

## Your First CUDA Program

Here's a simple CUDA program that adds two vectors:

\`\`\`cpp
#include <stdio.h>

// CUDA kernel for vector addition
__global__ void vectorAdd(float *a, float *b, float *c, int n) {
    // Calculate global thread ID
    int tid = blockIdx.x * blockDim.x + threadIdx.x;
    
    // Make sure we don't go out of bounds
    if (tid < n) {
        c[tid] = a[tid] + b[tid];
    }
}

int main() {
    // Vector size
    int n = 1000000;
    size_t bytes = n * sizeof(float);
    
    // Host vectors
    float *h_a, *h_b, *h_c;
    
    // Device vectors
    float *d_a, *d_b, *d_c;
    
    // Allocate host memory
    h_a = (float*)malloc(bytes);
    h_b = (float*)malloc(bytes);
    h_c = (float*)malloc(bytes);
    
    // Initialize vectors
    for (int i = 0; i < n; i++) {
        h_a[i] = 1.0f;
        h_b[i] = 2.0f;
    }
    
    // Allocate device memory
    cudaMalloc(&d_a, bytes);
    cudaMalloc(&d_b, bytes);
    cudaMalloc(&d_c, bytes);
    
    // Copy data from host to device
    cudaMemcpy(d_a, h_a, bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, bytes, cudaMemcpyHostToDevice);
    
    // Launch kernel
    int blockSize = 256;
    int gridSize = (n + blockSize - 1) / blockSize;
    vectorAdd<<<gridSize, blockSize>>>(d_a, d_b, d_c, n);
    
    // Copy result back to host
    cudaMemcpy(h_c, d_c, bytes, cudaMemcpyDeviceToHost);
    
    // Verify result
    for (int i = 0; i < n; i++) {
        if (h_c[i] != 3.0f) {
            printf("Error: result[%d] = %f\\n", i, h_c[i]);
            break;
        }
    }
    
    printf("CUDA vector addition completed successfully!\\n");
    
    // Free memory
    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    free(h_a);
    free(h_b);
    free(h_c);
    
    return 0;
}
\`\`\`

## Key CUDA Concepts

1. **Kernels**: Functions that run on the GPU (prefixed with \`__global__\`)
2. **Thread Hierarchy**: 
   - Threads are organized into blocks
   - Blocks are organized into grids
3. **Memory Hierarchy**:
   - Global memory (accessible by all threads)
   - Shared memory (shared within a block)
   - Local memory (private to each thread)
   - Registers (fastest, but limited)

## Optimizing CUDA Performance

- Minimize data transfers between CPU and GPU
- Use shared memory for frequently accessed data
- Optimize memory access patterns
- Balance thread workload
- Use asynchronous operations when possible

## Next Steps

Once you're comfortable with basic CUDA programming, explore:

1. CUDA libraries (cuBLAS, cuDNN)
2. Advanced memory management
3. Stream processing for concurrent execution
4. Multi-GPU programming

Happy GPU computing!
    `,
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CUDA", "C++", "GPU Computing", "Parallel Programming"],
    publishedAt: "2024-04-15T10:00:00Z",
    updatedAt: "2024-04-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Building Scalable Microservices with Go",
    slug: "building-scalable-microservices-with-go",
    description:
      "Learn how to design and implement robust microservices architecture using Go and modern cloud-native patterns.",
    content: `
# Building Scalable Microservices with Go

Go (Golang) has become one of the most popular languages for building microservices due to its simplicity, performance, and excellent concurrency support. In this post, I'll share my experience building scalable microservices with Go.

## Why Go for Microservices?

- **Compiled language**: Fast execution and small binary size
- **Concurrency primitives**: Goroutines and channels make concurrent programming easier
- **Standard library**: Rich standard library with HTTP server, JSON handling, etc.
- **Simplicity**: Easy to learn and maintain
- **Cross-platform**: Compile for different operating systems easily

## Setting Up a Basic Go Microservice

Let's start with a simple HTTP server:

\`\`\`go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Response struct {
    Message string \`json:"message"\`
    Status  int    \`json:"status"\`
}

func main() {
    // Define routes
    http.HandleFunc("/health", healthCheckHandler)
    
    // Start server
    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Server failed to start: %v", err)
    }
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
    response := Response{
        Message: "Service is healthy",
        Status:  200,
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
}
\`\`\`

## Structuring Your Microservice

A well-organized Go microservice typically follows this structure:

\`\`\`
my-service/
├── cmd/
│   └── server/
│       └── main.go       # Application entry point
├── internal/
│   ├── api/              # API handlers
│   ├── config/           # Configuration
│   ├── domain/           # Business logic and domain models
│   ├── repository/       # Data access layer
│   └── service/          # Service layer
├── pkg/                  # Reusable packages
├── go.mod                # Go modules file
└── go.sum                # Go modules checksum
\`\`\`

## Adding Database Connectivity

Here's how to connect to a PostgreSQL database using the popular \`database/sql\` package with the \`lib/pq\` driver:

\`\`\`go
package repository

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq" // PostgreSQL driver
)

type Config struct {
    Host     string
    Port     int
    User     string
    Password string
    DBName   string
    SSLMode  string
}

func NewPostgresDB(cfg Config) (*sql.DB, error) {
    connStr := fmt.Sprintf(
        "host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
        cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
    )
    
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, fmt.Errorf("failed to open database: %w", err)
    }
    
    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("failed to ping database: %w", err)
    }
    
    return db, nil
}
\`\`\`

## Implementing REST API Endpoints

Let's create a simple CRUD API for a user service:

\`\`\`go
package api

import (
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
    "myservice/internal/domain"
    "myservice/internal/service"
)

type UserHandler struct {
    userService *service.UserService
}

func NewUserHandler(userService *service.UserService) *UserHandler {
    return &UserHandler{userService: userService}
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    
    user, err := h.userService.GetByID(r.Context(), id)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

// Other CRUD handlers...
\`\`\`

## Containerizing Your Microservice

Create a Dockerfile for your Go microservice:

\`\`\`dockerfile
# Build stage
FROM golang:1.18-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server

# Final stage
FROM alpine:3.15

WORKDIR /app

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
\`\`\`

## Monitoring and Observability

Implement metrics, logging, and tracing:

\`\`\`go
package main

import (
    "github.com/prometheus/client_golang/prometheus/promhttp"
    "go.uber.org/zap"
    "net/http"
)

func main() {
    // Initialize logger
    logger, _ := zap.NewProduction()
    defer logger.Sync()
    
    // Register Prometheus metrics endpoint
    http.Handle("/metrics", promhttp.Handler())
    
    // Start server with logging
    logger.Info("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        logger.Fatal("Server failed to start", zap.Error(err))
    }
}
\`\`\`

## Conclusion

Go provides an excellent foundation for building microservices that are:

- Fast and efficient
- Easy to deploy and scale
- Simple to maintain
- Resilient and reliable

By following these patterns and practices, you can create a robust microservices architecture that scales with your needs.
    `,
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Go", "Microservices", "Backend", "Cloud"],
    publishedAt: "2024-04-10T14:30:00Z",
    updatedAt: "2024-04-10T14:30:00Z",
  },
]
