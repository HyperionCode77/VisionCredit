import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b38f1634/health", (c) => {
  return c.json({ status: "ok" });
});

// Bank connections endpoints
app.get("/make-server-b38f1634/connections", async (c) => {
  try {
    const connections = await kv.getByPrefix("connection:");
    return c.json({ connections });
  } catch (error) {
    console.log(`Error fetching connections: ${error}`);
    return c.json({ error: "Failed to fetch connections" }, 500);
  }
});

app.post("/make-server-b38f1634/connections", async (c) => {
  try {
    const body = await c.req.json();
    const id = `connection:${Date.now()}`;
    await kv.set(id, body);
    return c.json({ success: true, id });
  } catch (error) {
    console.log(`Error creating connection: ${error}`);
    return c.json({ error: "Failed to create connection" }, 500);
  }
});

// Expenses endpoints
app.get("/make-server-b38f1634/expenses", async (c) => {
  try {
    const expenses = await kv.getByPrefix("expense:");
    return c.json({ expenses });
  } catch (error) {
    console.log(`Error fetching expenses: ${error}`);
    return c.json({ error: "Failed to fetch expenses" }, 500);
  }
});

app.post("/make-server-b38f1634/expenses", async (c) => {
  try {
    const body = await c.req.json();
    const id = `expense:${Date.now()}`;
    await kv.set(id, body);
    return c.json({ success: true, id });
  } catch (error) {
    console.log(`Error creating expense: ${error}`);
    return c.json({ error: "Failed to create expense" }, 500);
  }
});

// Employees endpoints
app.get("/make-server-b38f1634/employees", async (c) => {
  try {
    const employees = await kv.getByPrefix("employee:");
    return c.json({ employees });
  } catch (error) {
    console.log(`Error fetching employees: ${error}`);
    return c.json({ error: "Failed to fetch employees" }, 500);
  }
});

app.post("/make-server-b38f1634/employees", async (c) => {
  try {
    const body = await c.req.json();
    const id = `employee:${Date.now()}`;
    await kv.set(id, body);
    return c.json({ success: true, id });
  } catch (error) {
    console.log(`Error creating employee: ${error}`);
    return c.json({ error: "Failed to create employee" }, 500);
  }
});

// Payroll endpoints
app.get("/make-server-b38f1634/payroll/:month", async (c) => {
  try {
    const month = c.req.param("month");
    const payroll = await kv.get(`payroll:${month}`);
    return c.json({ payroll });
  } catch (error) {
    console.log(`Error fetching payroll: ${error}`);
    return c.json({ error: "Failed to fetch payroll" }, 500);
  }
});

app.post("/make-server-b38f1634/payroll", async (c) => {
  try {
    const body = await c.req.json();
    const { month, data } = body;
    await kv.set(`payroll:${month}`, data);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving payroll: ${error}`);
    return c.json({ error: "Failed to save payroll" }, 500);
  }
});

// Company settings
app.get("/make-server-b38f1634/settings", async (c) => {
  try {
    const settings = await kv.get("settings:company");
    return c.json({ settings });
  } catch (error) {
    console.log(`Error fetching settings: ${error}`);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});

app.post("/make-server-b38f1634/settings", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("settings:company", body);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving settings: ${error}`);
    return c.json({ error: "Failed to save settings" }, 500);
  }
});

Deno.serve(app.fetch);