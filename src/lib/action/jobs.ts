import { NewJobForm } from "@/app/dashboard/recruiter/jobs/new/page";



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL  || 'http://localhost:5000'

export  const  createJob = async (date: NewJobForm)=>{
const res = await fetch(`${BASE_URL}/jobs`,
    {
        method:'POST',
        headers:{
            'content-type': 'application/json',
        },
        body:JSON.stringify(date)
    }
)

return res.json();
}


export const getAllJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};


// Delete Job

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  console.log("Delete Status:", res.status);
  console.log("Delete Response:", result);

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete job");
  }

  return result;
};


export const updateUser = async (id: string, data: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};