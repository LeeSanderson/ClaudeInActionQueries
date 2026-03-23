import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { createSchema } from "./schema";
import { getPendingOrders } from "./queries/order_queries";
import { sendSlackMessage } from "./slack";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL ?? "";
const OVERDUE_THRESHOLD_DAYS = 3;

async function main() {
  const db = await open({
    filename: "ecommerce.db",
    driver: sqlite3.Database,
  });

  await createSchema(db, false);

  const overdueOrders = await getPendingOrders(db, OVERDUE_THRESHOLD_DAYS);

  if (overdueOrders.length === 0) {
    return;
  }

  if (!SLACK_WEBHOOK_URL) {
    console.error("SLACK_WEBHOOK_URL is not set — skipping Slack alert");
    return;
  }

  const lines = overdueOrders.map(
    (o) =>
      `• Order ${o.order_id} — ${o.customer_name} (${o.phone ?? "no phone"}) — pending ${Math.floor(o.days_since_created)} days`
  );

  const message =
    `:warning: *${overdueOrders.length} order(s) have been pending for more than ${OVERDUE_THRESHOLD_DAYS} days:*\n` +
    lines.join("\n");

  await sendSlackMessage(SLACK_WEBHOOK_URL, message);
}

main();
