import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const isTitleMatch = job.title
          .toLowerCase()
          .includes(searchedQuery.toLowerCase());
        const isDescriptionMatch = job.description
          .toLowerCase()
          .includes(searchedQuery.toLowerCase());
        const isLocationMatch = job.location
          .toLowerCase()
          .includes(searchedQuery.toLowerCase());

        let isSalaryMatch = false;

        // Check if the searchedQuery is a salary range
        if (searchedQuery.includes("-")) {
          const [minSalary, maxSalary] = searchedQuery.split("-").map(Number);

          // Ensure job.salary is a number before comparison
          const jobSalary = Number(job.salary);

          if (
            !isNaN(jobSalary) &&
            jobSalary >= minSalary &&
            jobSalary <= maxSalary
          ) {
            isSalaryMatch = true;
          }
        }

        return (
          isTitleMatch || isDescriptionMatch || isLocationMatch || isSalaryMatch
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
