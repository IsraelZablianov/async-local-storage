import express, { Request, Response } from "express";
import { cpus } from "os";
import cluster from "cluster";

console.log(`running... process id is ${process.pid}`)

if (cluster.isPrimary) {
  console.log(`running... cpus.length is ${cpus().length}`)
  console.log(`inside primary`);
  masterProcess()
} else {
  console.log(`inside child`);
  childProcess()
}

function masterProcess() {
  console.log(`Master process ${process.pid} is running`)

  //fork workers.

  for (let i = 0; i < cpus().length; i++) {
    console.log(`Forking process number ${i}...`)
    cluster.fork() //creates new node js processes
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork() //forks a new process if any process dies
  })
}

function childProcess() {
  const app = express()
  //workers can share TCP connection

  app.get("/", (req: Request, res: Response) => {
    res.send(`hello from server ${process.pid} saved pid ${(globalThis as any).pid}`);
    (globalThis as any).pid = process.pid;
  })

  app.listen(5555, () =>
    console.log(`server ${process.pid} listening on port 5555`)
  )
}