
# E-Commerce Data Utilities

TypeScript query utilities for a SQLite-backed e-commerce database.

## Notes

This project is part of the [Claude Code In Action](https://anthropic.skilljar.com/claude-code-in-action) course from Anthropic.

Specifically this project is in the section of the course around hooks.

## Setup

```bash
npm run setup
```

## Project Structure

- `src/main.ts` — Entry point
- `src/schema.ts` — Database schema definitions
- `src/queries/` — Query modules:
  - `customer_queries.ts` — Customer lookup and management
  - `product_queries.ts` — Product catalog queries
  - `order_queries.ts` — Order management
  - `analytics_queries.ts` — Reporting and analytics
  - `inventory_queries.ts` — Inventory management
  - `promotion_queries.ts` — Promotions
  - `review_queries.ts` — Product reviews
  - `shipping_queries.ts` — Shipping

## Database Schema

The SQLite database models a complete e-commerce system with tables for customers, products, orders, reviews, inventory, promotions, and more. See `src/schema.ts` for the full schema.

## Usage

All query functions accept a `Database` instance and return Promises:

```typescript
import { getCustomerByEmail } from "./queries/customer_queries";

const customer = await getCustomerByEmail(db, "user@example.com");
```

## Tech Stack

- TypeScript
- SQLite (via `sqlite3` / `sqlite`)
- tsx (runtime)
