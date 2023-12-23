// src/components/TicketCards.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTicketContext } from "../context/TicketContex";
import TicketStatus from "./TicketStatus";

const TicketCards = () => {
  const { grouping, ordering } = useTicketContext();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
        );
        setTickets(response.data.tickets.slice(0, 10));
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const groupedAndOrderedTickets = groupAndOrderTickets(
    tickets,
    grouping,
    ordering
  );

  return (
    <div>
      <TicketStatus />

      <div className="flex flex-wrap justify-center">
        {groupedAndOrderedTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="max-w-sm m-4 overflow-hidden shadow-md rounded-md relative"
          >
            <div className="absolute top-0 right-0 p-2">
              <img
                src="https://via.placeholder.com/20"
                alt="Profile Icon"
                className="rounded-full"
              />
            </div>

            <div className="p-4">
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">{ticket.id}</h3>
                <h4 className="text-xl font-semibold mb-2">{ticket.title}</h4>
                <p className="text-gray-700">{ticket.tag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const groupAndOrderTickets = (tickets, grouping, ordering) => {
  const groupedTickets = groupTickets(tickets, grouping);

  const orderedTickets = orderTickets(groupedTickets, ordering);

  const flattenedTickets = [].concat(...orderedTickets);

  return flattenedTickets;
};

const groupTickets = (tickets, grouping) => {
  switch (grouping) {
    case "status":
      return groupBy(tickets, "status");
    case "user":
      return groupBy(tickets, "userId");
    case "priority":
      return groupBy(tickets, "priority");
    default:
      return tickets;
  }
};

const orderTickets = (tickets, ordering) => {
  switch (ordering) {
    case "priority":
      return tickets.sort((a, b) => b[0].priority - a[0].priority);
    case "title":
      return tickets.sort((a, b) => a[0].title.localeCompare(b[0].title));
    default:
      return tickets;
  }
};

const groupBy = (array, key) => {
  return Object.values(
    array.reduce((result, item) => {
      const keyValue = item[key];
      (result[keyValue] = result[keyValue] || []).push(item);
      return result;
    }, {})
  );
};

export default TicketCards;
