import React, { useState, useEffect } from 'react';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { IoIosTrash } from "react-icons/io";

const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const postCollection = collection(db, 'posts');


  const getPosts = async () => {
   const data = await getDocs(postCollection);
   setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  useEffect(() => {
   getPosts();
  }, []);


     //for deletepost function 
  const deletePost = async (id) => {
   const postDoc = doc(db, 'posts', id);
   await deleteDoc(postDoc);
   getPosts(); // Refresh after delete
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800"> Latest Blog Posts</h1>
      
      <div className="grid gap-6 max-w-3xl mx-auto">
        {postLists.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6 relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
              {isAuth && post.author.id === auth.currentUser?.uid && (
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  title="Delete Post"
                >
                <IoIosTrash  className="text-red-500 hover:text-red-700" />
                </button>
              )}
            </div>
            <p className="text-gray-700 mb-4">{post.postText}</p>
            <p className="text-sm text-gray-500 italic">Posted by @{post.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
