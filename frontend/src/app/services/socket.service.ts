import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Connect to the backend WebSocket server
    this.socket = io(environment.baseUrlSocket);  // Backend WebSocket URL// 'http://localhost:5000'
  }

  // Listen for task creation
  onTaskCreated(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('taskCreated', (task) =>{
        console.log("taskCreated", task)

        observer.next(task)
      });
    });
  }

  // Listen for task update
  onTaskUpdated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskUpdated', (task) =>{

        console.log("onTaskUpdated", task)
        observer.next(task)
      });
    });
  }

    // Listen for task deletion
    onTaskDeleted(): Observable<any> {
      return new Observable((observer) => {
        this.socket.on('taskDeleted', (taskId) =>{
        console.log("taskDeleted", taskId)
          observer.next(taskId)
        });
      });
    }

}
