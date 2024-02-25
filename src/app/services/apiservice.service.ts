import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 

  API = axios.create({
    baseURL: environment.baseUrl,
    withCredentials: true,
    headers: {
      'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
    }
  })

  constructor() { }

  async updateToken() {
    this.API = axios.create({
      baseURL: environment.baseUrl,
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Bearer ${localStorage.getItem("token")}`
          : "",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }
  

  async userLogin(param: any) {
    return await this.API.post('/api/users/login', param);
  }

  async getAllAssigned() {
    return await this.API.get('/api/users/getAllAssigned');
  }
  async updatePassword(param: any) {
    return await this.API.post('/api/users/updatePassword', param);
  }

async getRooms(){
  return await this.API.get('/api/rooms/getRooms')
}
async addRoom(param:any){
  return await this.API.post('/api/rooms/createRoom',param)
}
async updateRoom(param:any){
  return await this.API.post('/api/rooms/updateRoom',param)
}




async getUsers(){
  return await this.API.get('/api/users/allUser')
}

async updateUsers(param:any){
  return await this.API.post('/api/users/updateUserDetails',param)
}

async updateUsersPassword(param:any){
  return await this.API.post('/api/users/resetPassword',param)
}


async assignRoom(param:any){
  return await this.API.post('/api/rooms/createBooking',param)
}

async getAllMeetings(){
  return await this.API.get('/api/rooms/getAllMeetings')
}

async deleteMeeting(meeting:any){
  return await this.API.post('/api/rooms/deletUserBooking',meeting)
}

async getUserMeetings(){
  return await this.API.get('/api/rooms/getUserMeetings')
}

async addSuggetion(param:any){
  return await this.API.post('/api/rooms/updateUserBooking',param)
}



//

async getInstructorData(){
  return await this.API.get('/api/instructor/getAllInstructor')
}

async addUser(param:any){
  return await this.API.post('/api/instructor/register',param)
}
async deleteInstructor(param:any){
  return await this.API.post('/api/instructor/deactivateInstructor',param)
}


async addcourse(param:any){
  return await this.API.post('/api/courses/addCourse',param)
}
async getcourse(){
  return await this.API.get('/api/courses/getAllCourses')
}

async deleteCourse(param:any){
  return await this.API.post('/api/courses/deleteCourse',param)
}

async updatecourse(param:any){
  return await this.API.post('/api/courses/updateCourse',param)
}

async getcourses(){
  return await this.API.get('/api/courses/getAllCourses')
}

async assignbatchtocourse(param:any){
  return await this.API.post('/api/courses/assignBatchToCourse',param)
}

async assignBatch(param:any){
  return await this.API.post('/api/courses/assignBatch',param)
}

async getAssignedBatches(param:any){
  return await this.API.post('/api/courses/getAllAssigned',param)
}

async getBatch(param:any){
  return await this.API.post('/api/courses/getBatchByCourseId',param)
}
}