/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Sidebar } from "@/components/Sidebar";
import { useSocket } from "@/providers/websocketProvider";
import { useCallback, useEffect, useState } from "react";
import { RxEraser } from "react-icons/rx";

export default function Home() {
  const [timeline, setTimeline] = useState<any[]>([]);
  const { isConnected, socket } = useSocket();

  const status = useCallback(() => {
    if (isConnected) {
      return <Badge>Connected</Badge>;
    }
    return <Badge variant="destructive">Disconnected</Badge>;
  }, [isConnected]);

  useEffect(() => {
    socket?.addEventListener("message", (event) => {
      setTimeline((prev) => [
        ...prev,
        JSON.stringify(event.data.toString("utf8")),
      ]);
    });
  }, [socket]);

  return (
    <main className="w-full min-w-[300px]">
      <div className="font-sans antialiased h-screen flex">
        <Sidebar />
        <div className="flex-1 bg-[#0A0B14]/65 flex flex-col overflow-hidden">
          <div className="border-b border-gray-600 flex px-6 py-2 items-center flex-none shadow-xl">
            <div className="flex w-full items-center justify-between text-xl text-gray-100">
              <div className="flex gap-4">
                <h3 className="mb-1 font-bold">
                  <span>⚡️</span> Timeline
                </h3>
                {status()}
              </div>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => setTimeline([])}
              >
                <RxEraser className="w-5 h-5 mr-2" /> Clear
              </Button>
            </div>
          </div>

          <div className="px-6 py-4 text-white flex-1 overflow-y-scroll">
            {!timeline.length && (
              <div className="flex h-full items-center justify-center">
                No events triggered
              </div>
            )}
            {timeline.map((time, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex justify-between w-full">
                      <div className="flex">
                        <div className="flex gap-2 items-center pr-2">
                          <span className="font-bold whitespace-nowrap text-orange-400 text-base">
                            API RESPONSE
                          </span>
                        </div>
                        <div className="flex text-gray-400 items-center gap-6 justify-between">
                          <span className="font-bold text-gray-400 text-xs">
                            09:23ms
                          </span>
                          <div className="flex gap-2">
                            <span className="border border-gray-700 p-1 px-2 rounded-md text-xs font-bold">
                              GET
                            </span>
                            {/* /user */}
                            {time}
                          </div>
                        </div>
                      </div>
                      <div className="flex text-white bg-green-700 px-2 items-center rounded-md text-xs font-bold">
                        200
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>Escondido</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
