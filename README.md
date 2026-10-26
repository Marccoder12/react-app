Test Live Demo https://react-app-ivory-five-81.vercel.app/


FineTask Technical Documentation

«Project: FineTask
Repository: "Marccoder12/react-app" (https://github.com/Marccoder12/react-app)
Application type: Financial task management web application
Status: In development»

1. Overview

FineTask is a financial task management application that helps users plan, organize, and resolve financial obligations according to their budgets and due dates.

Unlike a conventional to-do list, FineTask organizes tasks around money-related responsibilities. Users create tasks associated with their financial plans, assign due dates, and receive notifications when those dates arrive so they can take the required action.

The application's central purpose is to reduce the mental effort required to remember financial commitments and manage them consistently.

1.1 Core objectives

- Allow users to create and manage financial tasks.
- Associate tasks with relevant budget information.
- Schedule tasks around their due dates.
- Notify users when financial tasks require attention.
- Track task status and completion.
- Provide a dashboard for monitoring tasks and financial activity.
- Establish a foundation for future automated payments and broader financial workflows.

1.2 Scope

FineTask is currently being developed as a web application. Its existing project dependencies include frontend, database integration, charting, payment integration, and web-push technologies.

The availability of a dependency does not necessarily mean its associated feature is fully implemented or production-ready.

---

2. Technology Stack

The following technologies are identifiable from the repository's "package.json".

Technology| Purpose
React 18| Component-based user interface
TypeScript| Static typing and improved maintainability
Vite| Development server and production build tooling
Tailwind CSS 4| Utility-first styling
Supabase JS| Backend and database integration
React Router DOM| Client-side navigation
React Toastify| In-app toast notifications
Chart.js and Recharts| Data visualization
Web Push ("web-push")| Server-side web push notification support
Paystack Inline JS| Payment integration support
React Icons| Interface icons
Shepherd.js| Guided user-interface tours

2.1 Frontend architecture

The frontend is built with React and TypeScript. The application is organized around reusable UI components, with the main application layout separating navigation from the primary content area.

The dashboard includes task-management functionality, task creation and editing interfaces, and summary visualizations.

The intended architectural responsibilities are:

- Layout: Navigation, sidebar, top bar, and responsive content container.
- Pages: Application screens and route-level views.
- Components: Reusable interface elements, forms, dialogs, and task displays.
- State management: User-interface state and shared application state.
- Services: Database operations and integration with external systems.
- Backend operations: Secure processing of scheduled jobs, payment operations, and push notifications.

These responsibilities describe the recommended separation of concerns. Exact component and folder names should be documented against the current source tree.

2.2 Backend architecture

Supabase provides the backend integration layer. Depending on the configured services, it can support database persistence, authentication, access control, and server-side functions.

Sensitive operations must run in trusted server-side environments. The browser must not receive Supabase service-role credentials, payment secret keys, or web push private keys.

---

3. Core Domain Concepts

3.1 Financial task

A financial task represents an obligation or planned action that the user intends to resolve by a specified date.

A task should conceptually contain:

Field| Purpose
Task ID| Unique identifier
User ID| Owner of the task
Name| Human-readable task title
Description| Optional additional details
Amount| Financial amount associated with the task, where applicable
Due date| Date on which the task should be resolved
Status| Current task state
Created timestamp| When the task was created
Updated timestamp| When the task was last modified

This is a conceptual data model, not a claim that every field already exists in the database. Field types, constraints, and names must match the actual Supabase schema.

3.2 Task lifecycle

A task moves through a lifecycle determined by its status and due date.

1. Creation: The user defines the financial task and its relevant details.
2. Scheduling: The task is associated with a due date.
3. Pending: The task awaits resolution.
4. Due: The task reaches its scheduled date and may require the user's attention.
5. Resolution: The user completes the required action and updates the task.
6. History: The application retains the task's relevant status and timestamps, according to its data-retention rules.

A task reaching its due date must not automatically be treated as completed. Due dates indicate when an action is required, not whether that action has occurred.

---

4. Task Management

4.1 Creating a task

The task creation workflow should:

1. Collect the required task information.
2. Validate the submitted values.
3. Validate the due date and any financial constraints.
4. Associate the task with the authenticated user.
5. Persist the task in Supabase.
6. Refresh the relevant dashboard data.
7. Report success or failure to the user.

The database should enforce ownership and other critical constraints rather than relying solely on frontend validation.

4.2 Editing a task

Users should be able to update supported task fields, including the due date.

When a due date changes, any scheduled notification mechanism must use the updated value. Previously scheduled reminders must not continue firing based on stale task data.

The "date_updated" field, if used by the implementation, should be updated consistently whenever relevant task data changes.

4.3 Resolving a task

Resolving a task records that the user has completed the associated action.

The operation should:

- Update the task's completion state.
- Record the relevant completion timestamp if supported.
- Refresh dashboard statistics.
- Prevent obsolete pending-task reminders from being sent.
- Preserve an appropriate history of the task.

Task completion and notification read status are separate concepts. Reading a reminder must not automatically mark the financial task as completed.

4.4 Dashboard

The dashboard provides an overview of the user's tasks and related financial information.

Its responsibilities include:

- Displaying task records.
- Providing task creation and editing controls.
- Showing relevant summary statistics.
- Visualizing supported financial or task data.
- Indicating pending and due tasks.
- Providing access to notification information.

Dashboard statistics should be derived from persisted data or a clearly defined application state. They should not rely on unrelated or stale component state.

---

5. Notification System

Notifications are an important part of FineTask because users need to know when a financial task becomes due.

The notification system must distinguish between determining when a notification is due, delivering it, recording its delivery, and recording whether the user has read it.

5.1 Notification architecture

The intended architecture separates the notification system into the following responsibilities.

Scheduler

A scheduled backend process identifies tasks whose notification conditions have been met.

Notification processor

The processor validates the task's current status, due date, ownership, and notification state before attempting delivery.

Delivery mechanism

The delivery layer sends an appropriate notification using the configured channel, such as browser push notifications or an in-app notification interface.

Notification persistence

Notification records track relevant delivery and read-state information.

Frontend notifier

The client displays available notifications and updates their read state when the notification is actually presented to the user, according to the application's chosen semantics.

5.2 Notification lifecycle

A typical notification lifecycle is:

1. A financial task is created with a due date.
2. The backend scheduler checks for eligible tasks.
3. The notification processor determines whether a notification is required.
4. The notification is created or retrieved from persistent storage.
5. The delivery mechanism attempts to notify the user.
6. Delivery state is recorded according to the actual outcome.
7. The frontend presents the notification.
8. The notification's read state is updated when it has been shown to the user, if that is the application's defined rule.

Notification creation, delivery, display, and reading should not be represented by a single boolean flag. They describe different events and can occur at different times.

5.3 Notification timestamps

Where supported by the database schema, timestamps can represent notification lifecycle events.

Field| Intended meaning
"notified_at"| When notification delivery was recorded
"read_at"| When the notification was recorded as read or shown, according to the application's semantics
"created_at"| When the notification record was created

A "NULL" timestamp indicates that the corresponding event has not been recorded.

Important: "notified_at" should not be set merely because a notification was created. Its precise meaning must be defined consistently, particularly if delivery attempts can fail.

Similarly, if "read_at" means the notification was displayed rather than explicitly opened by the user, that distinction must be documented and applied consistently.

5.4 Scheduled processing

A scheduled process can use Supabase Cron ("pg_cron") to run periodically and identify tasks that require notifications.

A possible architecture is:

"pg_cron → pg_net → Supabase Edge Function → database validation → notification delivery"

This is an architectural option, not a claim that every component in this sequence is already configured.

The scheduled process should:

- Query only eligible tasks.
- Use a consistent timezone policy.
- Check whether a task has already been processed.
- Avoid notifying users about completed or cancelled tasks.
- Handle failed delivery attempts.
- Avoid duplicate notifications when jobs overlap or retry.
- Record enough information to diagnose failures.

A recurring scheduler should not blindly send a notification every time it encounters a task whose due date is in the past.

5.5 Idempotency and duplicate prevention

Scheduled jobs may run more than once. Network requests may time out even when a remote operation has succeeded. Retrying without safeguards can therefore produce duplicate notifications.

The system should use a stable notification identity or an equivalent database constraint to prevent duplicate notification records for the same intended event.

For example, an application could define uniqueness using a task identifier, notification type, and scheduled occurrence.

If multiple workers can process notifications concurrently, the database should provide an appropriate locking or atomic-claim mechanism.

5.6 Browser push notifications

Web push notifications generally require:

- A secure origin, normally HTTPS.
- Browser notification permission.
- A registered service worker.
- A push subscription for the relevant browser.
- A server-side delivery mechanism.
- A VAPID public/private key pair.

The public key may be shared with the browser during subscription setup. The private key must remain on the server.

Push subscriptions can expire or become invalid, so the delivery system must handle rejected subscriptions and remove or refresh invalid records where appropriate.

Browser push notifications are not guaranteed to arrive at an exact time. Delivery depends on the browser, operating system, subscription, network, and other platform conditions.

5.7 Offline behavior

Browser push notifications and in-app notifications have different requirements.

An in-app notification generally requires the application to be open and able to retrieve its data. A properly configured browser push system can deliver notifications while the application page is not open, subject to browser and operating-system support.

Local reminders may provide another offline-capable option, but they require separate scheduling and persistence logic.

The implementation must explicitly define which notification channels it supports. A notification record in Supabase does not, by itself, guarantee offline notification delivery.

---

6. Database and Data Integrity

Supabase is the persistence layer for the application.

Database design should support task ownership, reliable notification processing, and consistent state transitions.

6.1 Data ownership

Every user-owned task and notification must be associated with the appropriate user or an explicitly authorized parent record.

Supabase Row Level Security (RLS) policies should restrict users to records they are permitted to access.

The frontend must not be treated as a security boundary.

6.2 Recommended integrity rules

- Task records must have valid ownership.
- Required fields must not be empty.
- Financial amounts must use suitable numeric types.
- Due dates must follow a consistent storage and timezone policy.
- Notification references must point to valid records.
- Task completion must be distinct from notification read status.
- Duplicate notification processing must be prevented.
- Server-only operations must use trusted credentials.

6.3 Date and timezone handling

Timestamps and date-only values must be handled deliberately.

A financial task due on a particular calendar date is not always equivalent to a timestamp at midnight UTC. Converting between local time and UTC without a defined policy can cause a task to appear due on the previous or following day.

The application should distinguish between:

- Date-only deadlines: A calendar date without a specific time.
- Timestamp deadlines: A specific moment in time.
- Display timezone: The timezone used to present dates to the user.
- Scheduler timezone: The timezone used to evaluate notification eligibility.

The database, scheduler, and frontend must agree on the interpretation of a task's due date.

---

7. Security

FineTask handles financial task information and may integrate with payment services. Security must be designed into the backend rather than added after deployment.

7.1 Secrets management

The following values must not be exposed in publicly accessible source files or browser bundles:

- Supabase service-role keys.
- Payment-provider secret keys.
- VAPID private keys.
- Other server-side credentials.

Use environment variables or the relevant hosting platform's secret-management facilities.

Vite exposes variables prefixed with "VITE_" to client-side code. Such variables must never contain private credentials.

7.2 Payment security

Payment operations must be validated by a trusted backend or payment provider.

The application must not treat a frontend success message as proof that a payment succeeded. Where payments are supported, use verified provider responses or signed webhooks, validate transaction references, and ensure payment processing is idempotent.

7.3 Authentication and authorization

Where authentication is enabled:

- Validate user identity on protected operations.
- Enforce record ownership through database policies.
- Validate server-side requests.
- Avoid exposing sensitive financial information in logs.
- Apply rate limits or other abuse controls to public endpoints.

---

8. Installation and Development

8.1 Prerequisites

Install:

- Node.js with a version compatible with the project's Vite and TypeScript dependencies.
- npm.
- Git.
- A Supabase project configured for the application.

8.2 Clone the repository

git clone https://github.com/Marccoder12/react-app.git
cd react-app

8.3 Install dependencies

npm install

8.4 Configure environment variables

Create a local ".env.local" file for development configuration.

For example, if the application reads these variables, the file could contain:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

These are example names, not verified variable names from the current source code. Check the existing Supabase client configuration and use the exact names expected by the application.

Do not put service-role keys, VAPID private keys, or payment secret keys in client-side environment variables.

8.5 Start the development server

npm run dev

Vite will print the local URL in the terminal.

8.6 Build for production

npm run build

The configured build script runs TypeScript compilation followed by the Vite production build.

8.7 Preview the production build

npm run preview

This previews the generated production bundle locally. It does not replace deploying the application to a production host.

---

9. Deployment

The repository includes Vercel-related deployment configuration.

A production deployment should include the following steps:

1. Configure the production environment variables.
2. Configure the production Supabase URL and client credentials.
3. Apply and verify database migrations.
4. Configure database access policies.
5. Configure any required Edge Functions and scheduled jobs.
6. Set up push notification credentials and server-side delivery.
7. Configure allowed origins and any required CORS policies.
8. Run the production build.
9. Verify task creation, editing, and completion.
10. Verify notification scheduling, delivery, and duplicate prevention.
11. Test the deployed application on desktop and mobile browsers.

Production secrets should be configured through the deployment platform or backend secret manager, not committed to the repository.

---

10. Testing and Reliability

The application should be tested at the component, integration, and workflow levels.

10.1 Task-management tests

- Create a task with valid information.
- Reject invalid task data.
- Edit a task and update its due date.
- Resolve a task.
- Confirm completed tasks are not treated as pending.
- Confirm users cannot access another user's tasks.

10.2 Notification tests

- Identify a task that becomes due.
- Confirm that an eligible task produces the intended notification.
- Confirm that completed tasks do not generate obsolete reminders.
- Confirm that repeated scheduler runs do not create duplicates.
- Simulate delivery failures.
- Confirm that read-state changes do not complete the associated task.
- Verify date handling around timezone boundaries.
- Verify browser permission denial and invalid push subscriptions.

10.3 Production checks

Before releasing a new version, verify that:

- The production build succeeds.
- Database policies are enabled and correct.
- Secrets are absent from public source files and browser bundles.
- Scheduled processing is active where required.
- Notification failures can be diagnosed.
- Responsive layouts work on supported screen sizes.

---

11. Known Technical Boundaries

The following distinctions are important when describing the current product:

- A scheduled financial task is not necessarily an automated payment.
- A notification that reaches its due date is not proof that the task has been resolved.
- A notification record is not proof of successful browser delivery.
- A frontend payment integration is not proof of secure payment verification.
- Installing a dependency does not establish that its associated feature is complete.
- A successful production build does not establish that the backend and scheduled workflows are working correctly.

FineTask's long-term architecture can support more automation, but each automated financial operation requires its own validation, authorization, failure handling, and audit trail.

---

12. Future Development

Potential development areas include:

- More reliable not