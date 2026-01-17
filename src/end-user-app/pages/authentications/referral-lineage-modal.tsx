import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const lineageMembers = [
  { id: 1, image: "https://i.pravatar.cc/150?img=1", name: "Member 1" },
  { id: 2, image: "https://i.pravatar.cc/150?img=2", name: "Member 2" },
  { id: 3, image: "https://i.pravatar.cc/150?img=3", name: "Member 3" },
  { id: 4, image: "https://i.pravatar.cc/150?img=4", name: "Muyiwa Ajayi" },
  { id: 5, image: "https://i.pravatar.cc/150?img=5", name: "Member 5" },
  { id: 6, image: "https://i.pravatar.cc/150?img=6", name: "Member 6" },
  { id: 7, image: "https://i.pravatar.cc/150?img=7", name: "Member 7" },
];

export default function ExtendedLineageModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(3);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < lineageMembers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getVisibleMembers = () => {
    // Always show 3 members on each side of center (total of 7 members)
    const leftMembers = [];
    const rightMembers = [];

    // Get up to 3 members to the left
    for (let i = 1; i <= 3; i++) {
      if (currentIndex - i >= 0) {
        leftMembers.unshift(lineageMembers[currentIndex - i]);
      }
    }

    // Get up to 3 members to the right
    for (let i = 1; i <= 3; i++) {
      if (currentIndex + i < lineageMembers.length) {
        rightMembers.push(lineageMembers[currentIndex + i]);
      }
    }

    // Return left members, center member, and right members
    return [...leftMembers, lineageMembers[currentIndex], ...rightMembers];
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false} className="rounded-[20px] p-6 sm:max-w-227">
          <div className="space-y-2.5">
            {/* Header */}
            <h2 className="mt-1 text-center text-2xl leading-[150%] font-medium tracking-[-2%]">
              Extended Lineage
            </h2>

            <div className="mt-8 space-y-3">
              {/* Avatar Carousel */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="popLayout">
                    {getVisibleMembers().map((member, index) => {
                      if (!member) {
                        // Render invisible placeholder
                        return <div key={`placeholder-${index}`} className="h-[24px] w-[24px]" />;
                      }

                      const actualIndex = lineageMembers.indexOf(member);
                      const position = actualIndex - currentIndex;
                      const isCenter = position === 0;

                      return (
                        <motion.div
                          key={member.id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            y: isCenter ? -8 : 0,
                          }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <div
                            className={`overflow-hidden rounded-full transition-all ${
                              isCenter
                                ? "h-20 w-20 ring-4 ring-green-500"
                                : Math.abs(position) === 1
                                  ? "h-[60px] w-[60px] ring-2 ring-gray-200"
                                  : Math.abs(position) === 2
                                    ? "h-[37px] w-[37px] ring-2 ring-gray-200"
                                    : "h-[24px] w-[24px] ring-2 ring-gray-200"
                            }`}
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#F2F2F2] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === lineageMembers.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#F2F2F2] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              {/* Invited By */}
              <p className="text-center text-lg leading-[150%] font-medium tracking-[0.1px]">
                Invited by {lineageMembers[currentIndex].name}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid w-full grid-cols-1 gap-2.5 md:flex">
              {/* User Info Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-25.75 w-full max-w-[30%] rounded-lg border border-[#F6F5F5] bg-[#F6F5F5] p-6"
              >
                <h3 className="text-xl leading-[160%] font-medium tracking-[0.1px]">
                  Adebayo Oludare
                </h3>
                <p className="text-xs leading-[160%] tracking-[0.1px]">adebayooludare@gmail.com</p>
              </motion.div>

              {/* Participation Score Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-25.75 w-full max-w-[20%] rounded-lg border border-[#F2F2F2] bg-[#F9ECFF] px-2.5 py-3.5 text-center"
              >
                <p className="mb-2 text-sm leading-[155%] font-medium tracking-[0%]">
                  Participation score
                </p>
                <p className="text-center text-[32px] leading-[140%] tracking-[-2%]">3/8</p>
              </motion.div>

              {/* Level Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex h-25.75 w-full max-w-[20%] flex-col items-center justify-center rounded-lg border border-[#F2F2F2] bg-[#E6FFEA] py-3.5"
              >
                <p className="mb-1 text-sm leading-[155%] font-medium tracking-[0%]">Lv. 5</p>
                <div className="h-12.25 w-12.25 bg-[#D9D9D9]"></div>
              </motion.div>
              {/* Communities Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h-25.75 w-full max-w-[30%] rounded-lg border border-[#F2F2F2] bg-[#FFFCF5] px-5 py-2.5"
              >
                <h4 className="mb-2 text-[13px] leading-[160%] font-medium tracking-[0%]">
                  Communities
                </h4>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"></div>
                  </div>
                  <div>
                    <p className="text-sm leading-[160%] font-medium tracking-[0.1px]">
                      Saint john women's
                    </p>
                    <p className="text-xs leading-[160%] tracking-[0.1px] text-[#707281]">
                      40.1k members
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
