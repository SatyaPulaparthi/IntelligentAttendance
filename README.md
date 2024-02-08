# Smart Attendance Application

This app helps tracks attendance via face recognition. It visualizes the student data and even allows exports to csv files.

## Major components:

### UI:
* Built with Angular framework and material for styling
* We currently mock the student data until backend is integrated properly
* It enables the profession/admin to login and see:
  * Attendance visualizations
  * Registration for students
  * students attendance tracking
  * Export attendance

### Firebase:
* Used for user management and authentication
* Used for storing attendance information in the nosql format

### Backend:
* Built using django rest and helps with face recognition
* (PENDING) It stores the registered student images and uses them for facial recognition when tracking 

