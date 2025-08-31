CREATE TABLE "service_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"request_id" text NOT NULL,
	"city" text NOT NULL,
	"apartment_name" text NOT NULL,
	"flat_number" text NOT NULL,
	"services" text NOT NULL,
	"service_date" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "service_requests_request_id_unique" UNIQUE("request_id")
);
