import { Badge } from "@/components/ui/badge";
import { CaretDown, MapPin } from "@phosphor-icons/react";

const UserUpcomingEventCard = () => {
  return (
    <div className="w-77.5 shrink-0 space-y-8">
      {/* Upcoming Events */}
      <div className="space-y-4 rounded-[10px] border border-[#F6F6F6] px-4 py-5">
        <div className="flex items-center justify-between border-b border-b-[#EFEFEF] pb-4">
          <h3 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
            Upcoming Events
          </h3>
          <CaretDown size={16} />
        </div>
        <div className="space-y-3">
          <h4 className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
            Target Rights & Repairs Q&A
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
              Wed, Apr 24 at 6:00PM
            </span>
            <Badge className="h-6.5 gap-1 rounded-full border-0 bg-[#FFF2D5] px-2 text-[10px] text-[#C58804] hover:bg-[#FFF2D5]">
              💛 RSVP
            </Badge>
          </div>
          <div className="flex items-center gap-2 border-t border-[#EFEFEF] pt-3 text-base leading-[155%] font-normal tracking-[0%] text-[#000000]">
            <MapPin weight="fill" size={16} /> Toronto, Ontario
          </div>
        </div>
      </div>

      {/* Campaign Resource Library */}
      <div className="space-y-4 rounded-[10px] border border-[#F6F6F6] px-4 py-5">
        <h3 className="line-clamp-1 border-b border-b-[#EFEFEF] pb-4 text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
          Campaign Resource Library
        </h3>
        <div className="space-y-3 pt-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${item === 1 ? "bg-[#DCFFE3] text-green-600" : item === 2 ? "bg-[#DCFFE3] text-green-800" : "bg-[#DCFFE3] text-green-500"}`}
                >
                  {item === 1 ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6664 11.1016C14.6664 11.2682 14.633 11.4349 14.5664 11.5882C14.5019 11.7419 14.4092 11.8821 14.293 12.0016C14.1724 12.1156 14.0324 12.2082 13.8797 12.2749C13.7231 12.3386 13.5554 12.3704 13.3864 12.3682C12.6319 12.3555 11.8783 12.427 11.1397 12.5816C10.2644 12.6848 9.42126 12.9734 8.66636 13.4282V3.48824C9.39369 3.14158 10.173 2.91624 10.973 2.82158C11.7872 2.65996 12.6164 2.5862 13.4464 2.60158C13.777 2.61993 14.0876 2.76569 14.313 3.00824C14.533 3.24291 14.655 3.55291 14.653 3.87491L14.6664 11.1016ZM7.33303 3.48824V13.4282C6.59058 12.9778 5.76137 12.6893 4.8997 12.5816C4.14722 12.4294 3.38067 12.3579 2.61303 12.3682C2.444 12.3704 2.27626 12.3386 2.1197 12.2749C1.96741 12.2079 1.82764 12.1155 1.70636 12.0016C1.58749 11.8843 1.49439 11.7435 1.43303 11.5882C1.36611 11.4348 1.33205 11.269 1.33303 11.1016V3.83491C1.33408 3.51353 1.45725 3.20457 1.67759 2.97061C1.89793 2.73666 2.19896 2.5952 2.5197 2.57491C3.3675 2.55348 4.21502 2.62727 5.04636 2.79491C5.84215 2.89581 6.61521 3.13021 7.33303 3.48824Z"
                          fill="#02B128"
                        />
                      </svg>
                    </>
                  ) : item === 2 ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.47139 1.5282C8.34637 1.40322 8.17683 1.33301 8.00005 1.33301C7.82328 1.33301 7.65374 1.40322 7.52872 1.5282L2.86205 6.19487L1.52872 7.5282C1.46505 7.5897 1.41426 7.66326 1.37932 7.7446C1.34438 7.82593 1.32599 7.91341 1.32522 8.00193C1.32445 8.09045 1.34132 8.17824 1.37484 8.26017C1.40836 8.3421 1.45786 8.41653 1.52046 8.47913C1.58305 8.54172 1.65749 8.59123 1.73942 8.62475C1.82135 8.65827 1.90914 8.67514 1.99765 8.67437C2.08617 8.6736 2.17365 8.65521 2.25499 8.62027C2.33633 8.58533 2.40989 8.53454 2.47139 8.47087L2.66672 8.27553V12.6662C2.66672 13.1966 2.87743 13.7053 3.25251 14.0804C3.62758 14.4555 4.13629 14.6662 4.66672 14.6662H11.3334C11.8638 14.6662 12.3725 14.4555 12.7476 14.0804C13.1227 13.7053 13.3334 13.1966 13.3334 12.6662V8.27553L13.5287 8.47087C13.6545 8.5923 13.8229 8.6595 13.9977 8.65798C14.1725 8.65646 14.3397 8.58635 14.4633 8.46274C14.5869 8.33914 14.657 8.17193 14.6585 7.99713C14.66 7.82233 14.5928 7.65393 14.4714 7.5282L8.47139 1.5282Z"
                          fill="#02B128"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 10.6667C7.63333 10.6667 7.31956 10.5362 7.05867 10.2753C6.79778 10.0144 6.66711 9.70044 6.66667 9.33333C6.66622 8.96622 6.79689 8.65244 7.05867 8.392C7.32044 8.13156 7.63422 8.00089 8 8C8.36578 7.99911 8.67978 8.12978 8.942 8.392C9.20422 8.65422 9.33467 8.968 9.33333 9.33333C9.332 9.69867 9.20156 10.0127 8.942 10.2753C8.68244 10.538 8.36844 10.6684 8 10.6667ZM4.91667 4.66667H11.0833L11.9333 2.96667C12.0444 2.74444 12.036 2.52778 11.908 2.31667C11.78 2.10556 11.5884 2 11.3333 2H4.66667C4.41111 2 4.21956 2.10556 4.092 2.31667C3.96444 2.52778 3.956 2.74444 4.06667 2.96667L4.91667 4.66667ZM5.6 14H10.4C11.4 14 12.25 13.6529 12.95 12.9587C13.65 12.2644 14 11.4116 14 10.4C14 9.97778 13.9278 9.56667 13.7833 9.16667C13.6389 8.76667 13.4333 8.40556 13.1667 8.08333L11.4333 6H4.56667L2.83333 8.08333C2.56667 8.40556 2.36111 8.76667 2.21667 9.16667C2.07222 9.56667 2 9.97778 2 10.4C2 11.4111 2.34733 12.264 3.042 12.9587C3.73667 13.6533 4.58933 14.0004 5.6 14Z"
                          fill="#02B128"
                        />
                      </svg>
                    </>
                  )}
                </div>
                <span className="text-base leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  Document Name {item}
                </span>
              </div>
              {item === 1 && (
                <Badge className="h-6.5 gap-1 rounded-full border-0 bg-[#FFF2D5] px-3.5 text-[10px] text-[#C58804] hover:bg-[#FFF2D5]">
                  NEW
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserUpcomingEventCard;
