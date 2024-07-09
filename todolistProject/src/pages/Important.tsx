import {  useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Menu from "../components/menu";
import {  useNavigate } from 'react-router-dom';

interface Data {
    id: number;
    title: string;
    date: Date;
    desc: string;
    priority: string;
    status: string;
}
interface Datas {
    datas: Data[];
    }
    

export default function Important() {
    let navigate = useNavigate() 

    const [resToDo, setResToDo] = useState([]);
    const [datas, setDatas] = useState<Datas | any>();

     useEffect(() => {
        //Runs only on the first render
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/todo');
                const datas = await response.json(); 
                if (datas) {
                    setResToDo(datas);

                }
            } catch (err) {
                setResToDo([]);
            }
        }
     fetchData();  
     }, []);
  
     function handelete(id:any){
    
        navigate('../edit/'+id)
  
       }
     let compt = 0




        
     return (
        <>
          <Menu />
          <div className="p-4 sm:ml-64">
            <div className="w-full max-w-5xl p-4 bg-white sm:p-6 dark:bg-white-800 dark:border-white-100">
              <h2 className="mb-9 text-base font-semibold text-gray-900 md:text-5xl dark:text-black">
                TASKS IMPORTANT
              </h2>
              <ul className="my-4 space-y-3">
                {resToDo.map((data) =>
                  data.priority === 'high' ? (
                    <li key={data.id}>
                      <div className="w-full max-w-4xl p-6 font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-black">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                          {data.title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {data.desc}
                        </p>
                        <div className="flex mt-4 md:mt-6">
                          <button
                            onClick={() => handelete(data.id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Edit
                          </button>
                          <a
                            href="#"
                            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-green-800 dark:text-gray-400 dark:border-green-800 dark:hover:text-white dark:hover:bg-green-700"
                          >
                            Finish
                          </a>
                        </div>
                        <NavBar compt={compt++} />
                      </div>      
                    </li>
                  ) : null
                )}     
              </ul>
             
            </div>
          </div>
        </>
      );
    }      