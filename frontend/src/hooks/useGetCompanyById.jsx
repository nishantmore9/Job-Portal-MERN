import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`/api/v1/company/get/${companyId}`, {
          withCredentials : true
        })
        if(res.data.success) {
          dispatch(setSingleCompany(res.data.company))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompany()
  }, [companyId, dispatch])
}

export default useGetCompanyById