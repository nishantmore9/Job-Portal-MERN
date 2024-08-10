import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/v1/job/get", {
          withCredentials : true
        })
        if(res.data.success) {
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchJobs()
  }, [])
}

export default useGetAllJobs