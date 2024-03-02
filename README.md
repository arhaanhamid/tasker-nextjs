# Blog Website

## Preview URL

https://strawhat-adventures.vercel.app/

## Description

Welcome to the Blog Website! This project allows users to sign up, create, and share their blog posts. Built with Next.js, React.js, CSS, and MongoDB, it provides a dynamic and interactive platform for users to engage in content creation and consumption.

## Why?

Blogging is a powerful way to share thoughts, ideas, and experiences. This project aims to provide a user-friendly and feature-rich environment for individuals to express themselves through written content.

## Quick Start

Get the project up and running on your local machine with these steps:  
  
1. **Clone the repository:**  
   git clone https://github.com/your-username/blog-website.git  

2. **Navigate to the project folder:**  
   cd blog-website  
   
4. **Install dependencies:**  
   npm install  
   
5. **Set up MongoDB:**  
   Create a MongoDB database and obtain the connection URL.  
   Create a .env.local file in the root of the project and add your MongoDB connection URL:  
   MONGODB_URI=your-mongodb-connection-url  

7. **Setup Providers:**  
   You will have to manually setup providers like Google/Github/Emailjs. Your .env file should look like something like this  
   MONGO_URI=mongodb+srv://joyboy:joyboy1011@cluster0.qsqjfij.mongodb.net/blogdb2?retryWrites=true&w=majority  

  AUTH_SECRET=RANDOM_UNIQUE_SECRET  
  AUTH_URL=http://localhost:3000/api/auth  
    
  GITHUB_ID=GET FROM GITHUB DEVELOPMENT SECTION  
  GITHUB_SECRET=GET FROM GITHUB DEVELOPMENT SECTION  
    
  GOOGLE_ID=GET FROM GOOGLE CLOUD CONSOLE  
  GOOGLE_SECRET=GET FROM GOOGLE CLOUD CONSOLE  
    
  NEXT_PUBLIC_SERVICE_ID=SETUP ON EMAILJS  
  NEXT_PUBLIC_TEMPLATE_ID=SETUP ON EMAILJS  
  NEXT_PUBLIC_USER_ID=SETUP ON EMAILJS  
  
  DOMAIN=http://localhost:3000  

9. **Run the development server:**  
   npm run dev  

Visit http://localhost:3000 in your web browser to interact with the blog website.    

NOTE: if any problem with getting id or secret keys, connect with me, I'll be glad to help.

## Usage

**Sign Up/Login:**
Users can sign up or log in using Github, Google, or Custom Credentials to the platform to create and manage their blog posts.

**Create Blog Posts:**
Authenticated users can create and publish their blog posts, sharing their content with the community.

**View Others' Posts:**
Users can explore and read blog posts created by others, fostering a sense of community and knowledge sharing.

**Admin Panel**
There will be a separate Admin Panel which only Admin can access where he can make Create/Delete Users/Posts.

## Contributing
If you have suggestions, find bugs, or want to contribute to the project, feel free to open an issue or create a pull request. Your contributions are valuable and appreciated!


