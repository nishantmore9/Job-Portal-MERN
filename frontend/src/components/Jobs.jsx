import React from 'react'
import Navbar from './shared/Navbar'
import FilterJobs from './FilterJobs'
import Job from './Job'
import { useSelector } from 'react-redux'

const jobArray =[1,2,3,4,5,6,7,8,9]

const Jobs = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterJobs />
          </div>
            { 
              allJobs.length <= 0 ? <span>Jobs not found</span> : (
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                  <div className='grid grid-cols-3 gap-4'>
                  {
                    allJobs.map((job) => (
                      <div>
                        <Job key={job._id} job={job} />
                      </div>
                    ))
                  }
                  </div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default Jobs