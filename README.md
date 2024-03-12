# Tasker - A smooth task management Webapp

## Preview URL

https://tasker-nextjs.vercel.app/

## Description

Welcome to the Tasker Webapp!  

Never miss a beat!  Tasker is your all-in-one task management solution. Sign up, create tasks, assign them to teammates, and get notified when deadlines approach.  Boost your productivity and stay organized - together.

## Why?

Juggling tasks and deadlines? Tasker tames the chaos.  Collaborate, set reminders, and stay on top of your game - all in one place.  

## Quick Start

Get the project up and running on your local machine with these steps:  
  
1. **Clone the repository:**  
   git clone https://github.com/your-username/tasker-nextjs.git  

2. **Navigate to the project folder:**  
   tasker-nextjs  
   
4. **Install dependencies:**  
   npm install  
   
5. **Set up MongoDB:**  
   Create a MongoDB database and obtain the connection URL.  
   Create a .env file in the root of the project and add your MongoDB connection URL:   
   MONGODB_URI=your-mongodb-connection-url  

7. **Setup Providers:**  
   You will have to manually setup providers with OAuth accessibility like Google/Github. You'll need Provider Secret and ID.  
   Your .env file should look like something like this  
   MONGODB_URI=your-mongodb-connection-url  

  AUTH_SECRET=RANDOM_UNIQUE_SECRET (Generate using: openssl rand -base64 32)    
  AUTH_URL=http://localhost:3000/api/auth  
  AUTH_API_KEY=ANYTHING_SECRET (Just for a little bit more secure authentication)  
    
  GITHUB_ID=GET FROM GITHUB DEVELOPMENT SECTION  
  GITHUB_SECRET=GET FROM GITHUB DEVELOPMENT SECTION  
    
  GOOGLE_ID=GET FROM GOOGLE CLOUD CONSOLE  
  GOOGLE_SECRET=GET FROM GOOGLE CLOUD CONSOLE  
  
  DOMAIN=http://localhost:3000  

8. Next step would be getting you Resend API, register and get API key.
   RESEND_API_KEY=re_YOUR_KEY

9. Last but not least, to schedule deadline emails, set up Trigger.dev Account and get your API keys.
  TRIGGER_API_KEY=tr_dev_YOUR_KEY  
  TRIGGER_API_URL=https://api.trigger.dev  
  NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY=pk_dev__YOUR_KEY  

10. **Run the development server:**  
   npm run dev  

Visit http://localhost:3000 in your web browser to interact with the Tasker website.    

NOTE: if any problem with getting id or secret keys, connect with me, I'll be glad to help.

## Usage and Features  

**User Authentication:**  
Sign up or log in using GitHub, Google, or custom credentials to access the task manager platform securely.  

**Task CRUD Operations:**  
Create new tasks, update task details, mark tasks as completed, and delete tasks as needed. Manage your tasks effortlessly.  

**Task Filtering:**  
Easily filter tasks based on priority levels, due dates, status (completed or pending), and other relevant criteria. Stay organized and focused.  

**Responsive Design:**  
Enjoy a seamless user experience across various devices and screen sizes. The application is designed to be visually appealing and functional on desktops, tablets, and mobile devices.  

**Task Categories:**  
Categorize your tasks for better organization. Whether it's personal, work-related, or for shopping, assign categories to tasks to streamline your to-do list.  

**Task Assignment:**  
Collaborate efficiently by assigning tasks to other users. Keep everyone on the same page and enhance teamwork.  

**Task Reminders:**  
Set reminders for upcoming tasks to ensure you never miss a deadline. Receive timely notifications to stay on top of your schedule.  

**Task Search:**  
Easily find specific tasks by using the search feature. Search by title or description to quickly locate the information you need.  

**Admin Panel:**  
Exclusive admin access to manage users and tasks. The admin can create and delete users, as well as oversee the task management system.  


## Contributing
Thank you for considering contributing to our Task Manager App! Contributions are highly valued and can come in various forms. Here's how you can get involved:  

Bug Reports, Feature Requests, Code Contributions, Testing, Documentation

