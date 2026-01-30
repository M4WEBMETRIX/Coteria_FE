import { Button } from "@/components/ui/button";
// import { FilePdf, FileText } from "@phosphor-icons/react";

const resources = [
  {
    id: 1,
    title: "Tenant Rights Guide",
    description: "Comprehensive guide detailing tenant rights and responsibilities in Ontario",
    date: "May 17, 2025",
    type: "pdf",
  },
  {
    id: 2,
    title: "Low Income Housing Directory",
    description: "Comprehensive guide detailing tenant rights and responsibilities in Ontario",
    date: "May 15, 2025",
    type: "ai",
  },
  {
    id: 3,
    title: "Affordable Housing Solutions",
    description: "A resource for understanding affordable housing options and programs available",
    date: "June 10, 2025",
    type: "ai",
  },
  {
    id: 4,
    title: "Tenant Advocacy Group",
    description: "Information on tenant support services and advocacy initiatives",
    date: "July 22, 2025",
    type: "ai",
  },
  {
    id: 5,
    title: "Landlord-Tenant Mediation",
    description:
      "Overview of mediation services available to resolve disputes between landlords and tenants",
    date: "August 30, 2025",
    type: "ai",
  },
  {
    id: 6,
    title: "Emergency Housing Support",
    description:
      "Services and resources available for individuals facing homelessness or housing crises",
    date: "September 15, 2025",
    type: "ai",
  },
];

const DashboardResources = () => {
  return (
    <div className="w-full space-y-5">
      <h2 className="text-[22px] leading-[155%] font-normal tracking-[-2%] text-[#000000]">
        Resources
      </h2>
      <div className="space-y-4 rounded-[24px] border border-[#ECEFF3] px-5 py-5 shadow-[0px_1px_2px_0px_#1018280D]">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between rounded-xl border border-[#F6F8FA] bg-[#F6F8FA] px-5 py-2.5"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0">
                {resource.type === "pdf" ? (
                  <svg
                    width="44"
                    height="58"
                    viewBox="0 0 44 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 7.03999C0 3.15191 3.15192 0 7.04 0H25.2579C27.1168 0 28.9002 0.735176 30.219 2.04512L41.9211 13.6681C43.2517 14.9897 44 16.7876 44 18.663V50.6476C44 54.5356 40.8481 57.6876 36.96 57.6876H7.04C3.15192 57.6876 0 54.5356 0 50.6476V7.03999Z"
                      fill="#E42526"
                    />
                    <path d="M28.1606 0L44.0006 15.733H28.1606V0Z" fill="#FADBE1" />
                    <path
                      d="M8.15891 50.0947V38.2147H12.8532C12.9687 38.2147 13.1062 38.2202 13.2657 38.2312C13.4252 38.2367 13.5792 38.2532 13.7277 38.2807C14.3712 38.3797 14.9102 38.5997 15.3447 38.9407C15.7847 39.2817 16.1147 39.7135 16.3347 40.236C16.5547 40.753 16.6647 41.3277 16.6647 41.9602C16.6647 42.5872 16.5519 43.162 16.3264 43.6845C16.1064 44.2015 15.7764 44.6332 15.3364 44.9797C14.9019 45.3207 14.3657 45.5407 13.7277 45.6397C13.5792 45.6617 13.4252 45.6782 13.2657 45.6892C13.1062 45.7002 12.9687 45.7057 12.8532 45.7057H9.62741V50.0947H8.15891ZM9.62741 44.3115H12.8037C12.9082 44.3115 13.0264 44.306 13.1584 44.295C13.2959 44.284 13.4252 44.2647 13.5462 44.2372C13.9257 44.1492 14.2337 43.9897 14.4702 43.7587C14.7122 43.5222 14.8882 43.2472 14.9982 42.9337C15.1082 42.6147 15.1632 42.2902 15.1632 41.9602C15.1632 41.6302 15.1082 41.3085 14.9982 40.995C14.8882 40.676 14.7122 40.3982 14.4702 40.1617C14.2337 39.9252 13.9257 39.7657 13.5462 39.6832C13.4252 39.6502 13.2959 39.631 13.1584 39.6255C13.0264 39.6145 12.9082 39.609 12.8037 39.609H9.62741V44.3115ZM18.3103 50.0947V38.2147H21.9733C22.0943 38.2147 22.306 38.2175 22.6085 38.223C22.911 38.2285 23.1998 38.2505 23.4748 38.289C24.3933 38.41 25.1605 38.7455 25.7765 39.2955C26.398 39.84 26.8655 40.533 27.179 41.3745C27.4925 42.216 27.6493 43.1427 27.6493 44.1547C27.6493 45.1667 27.4925 46.0935 27.179 46.935C26.8655 47.7765 26.398 48.4722 25.7765 49.0222C25.1605 49.5667 24.3933 49.8995 23.4748 50.0205C23.1998 50.0535 22.9083 50.0755 22.6003 50.0865C22.2978 50.092 22.0888 50.0947 21.9733 50.0947H18.3103ZM19.82 48.6922H21.9733C22.1823 48.6922 22.416 48.6867 22.6745 48.6757C22.933 48.6592 23.1585 48.6345 23.351 48.6015C24 48.4805 24.5253 48.2082 24.9268 47.7847C25.3283 47.3612 25.6225 46.8332 25.8095 46.2007C25.9965 45.5682 26.09 44.8862 26.09 44.1547C26.09 43.4067 25.9938 42.7165 25.8013 42.084C25.6143 41.4515 25.32 40.9262 24.9185 40.5082C24.517 40.0902 23.9945 39.8235 23.351 39.708C23.1585 39.6695 22.9303 39.6447 22.6663 39.6337C22.4023 39.6227 22.1713 39.6172 21.9733 39.6172H19.82V48.6922ZM29.5412 50.0947V38.2147H36.4712V39.6832H31.0097V43.4205H35.4812V44.889H31.0097V50.0947H29.5412Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    width="44"
                    height="58"
                    viewBox="0 0 44 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 7.03999C0 3.15191 3.15192 0 7.04 0H25.2579C27.1168 0 28.9002 0.735176 30.219 2.04512L41.9211 13.6681C43.2517 14.9897 44 16.7876 44 18.663V50.6476C44 54.5356 40.8481 57.6876 36.96 57.6876H7.04C3.15192 57.6876 0 54.5356 0 50.6476V7.03999Z"
                      fill="#5C3D1F"
                    />
                    <path d="M28.1606 0L44.0006 15.733H28.1606V0Z" fill="#FAEDCC" />
                    <path
                      d="M7.32512 49.8447L11.3016 37.9647H13.3476L17.3241 49.8447H15.7979L12.0771 38.8227H12.5391L8.85137 49.8447H7.32512ZM9.23912 47.0645V45.6867H15.4101V47.0645H9.23912ZM18.966 49.8447V37.9647H20.4345V49.8447H18.966Z"
                      fill="white"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-sm leading-[155%] font-medium tracking-[0%] text-[#000000]">
                  {resource.title}
                </h3>
                <p className="mb-1 text-xs leading-[155%] font-light tracking-[0%] text-[#6F6F6F]">
                  {resource.description}
                </p>
                <div className="flex items-center text-xs leading-[155%] font-light tracking-[0%] text-[#6F6F6F]">
                  <span className="mr-1.75">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.8125 1.875C5.8125 1.56434 5.56066 1.3125 5.25 1.3125C4.93934 1.3125 4.6875 1.56434 4.6875 1.875V3.05944C3.608 3.14588 2.89933 3.35803 2.37868 3.87868C1.85803 4.39933 1.64588 5.108 1.55944 6.1875H16.4406C16.3541 5.108 16.142 4.39933 15.6213 3.87868C15.1007 3.35803 14.392 3.14588 13.3125 3.05944V1.875C13.3125 1.56434 13.0607 1.3125 12.75 1.3125C12.4393 1.3125 12.1875 1.56434 12.1875 1.875V3.00968C11.6886 3 11.1293 3 10.5 3H7.5C6.87072 3 6.31145 3 5.8125 3.00968V1.875Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.5 9C16.5 8.37072 16.5 7.81145 16.4903 7.3125H1.50968C1.5 7.81145 1.5 8.37072 1.5 9V10.5C1.5 13.3284 1.5 14.7426 2.37868 15.6213C3.25736 16.5 4.67157 16.5 7.5 16.5H10.5C13.3284 16.5 14.7426 16.5 15.6213 15.6213C16.5 14.7426 16.5 13.3284 16.5 10.5V9ZM10.5 9.1875C9.77513 9.1875 9.1875 9.77513 9.1875 10.5V12C9.1875 12.7249 9.77513 13.3125 10.5 13.3125C11.2249 13.3125 11.8125 12.7249 11.8125 12V10.5C11.8125 9.77513 11.2249 9.1875 10.5 9.1875ZM10.5 10.3125C10.3964 10.3125 10.3125 10.3964 10.3125 10.5V12C10.3125 12.1036 10.3964 12.1875 10.5 12.1875C10.6036 12.1875 10.6875 12.1036 10.6875 12V10.5C10.6875 10.3964 10.6036 10.3125 10.5 10.3125ZM8.09026 9.23032C8.30045 9.31738 8.4375 9.52249 8.4375 9.75V12.75C8.4375 13.0607 8.18566 13.3125 7.875 13.3125C7.56434 13.3125 7.3125 13.0607 7.3125 12.75V11.108L7.14775 11.2727C6.92808 11.4924 6.57192 11.4924 6.35225 11.2727C6.13258 11.0531 6.13258 10.6969 6.35225 10.4773L7.47725 9.35225C7.63813 9.19138 7.88007 9.14325 8.09026 9.23032Z"
                        fill="black"
                      />
                    </svg>
                  </span>{" "}
                  <p className="mt-0.5">{resource.date}</p>
                </div>
              </div>
            </div>
            <Button className="h-11 rounded-[12px] bg-[#12AA5B] px-6 text-sm leading-5 font-light tracking-[0%] text-white hover:bg-[#00b05b]">
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardResources;
