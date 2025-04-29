import React, { useEffect, useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postCollection = collection(db, 'posts');
  const navigate = useNavigate();

  const createPost = async () => {
    if (title.trim() === '' || postText.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }
    await addDoc(postCollection, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      },
    });
    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="min-h-screen bg-[#c0bfbf] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 new  p-10  rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#1b1b1b] mb-2">Create a New Blog Post</h1>
          <p className="text-black">Share your thoughts with the world 🌎</p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-left font-semibold text-black">Title</label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              className="rounded-lg border-black focus:border-blue-500 bg-[#4b4b4b] text-black focus:ring-2 focus:ring-blue-200 shadow-sm p-3"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-left font-semibold text-black">Post Content</label>
            <textarea
              rows="8"
              placeholder="Start writing your story here..."
              className="rounded-lg border-gray-300 focus:border-black  bg-[#4b4b4b] focus:ring-2 focus:ring-black shadow-sm p-3 resize-none"
              onChange={(event) => setPostText(event.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={createPost}
              className="bg-[#050505] hover:bg-[#1b1b1b] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Submit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
