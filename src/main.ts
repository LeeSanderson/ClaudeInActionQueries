import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { createSchema } from "./schema";
import { getOverduePendingOrders } from "./queries/order_queries";

async function main() {
  const db = await open({
    filename: "ecommerce.db",
    driver: sqlite3.Database,
  });

  await createSchema(db, false);

  const orders = await getOverduePendingOrders(db);

  if (orders.length === 0) {
    console.log("No pending orders older than 3 days.");
    return;
  }

  console.log(`Pending orders older than 3 days (${orders.length}):\n`);
  for (const order of orders) {
    console.log(
      `Order #${order.order_number} | ${order.customer_name} (${order.email}) | $${order.total_amount} | ${order.days_pending} days pending | Created: ${order.created_at}`
    );
  }
}

main();
