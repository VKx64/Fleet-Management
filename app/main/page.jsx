"use client";
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'

const page = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div>Welcome {user.email}</div>
  )
}

export default page