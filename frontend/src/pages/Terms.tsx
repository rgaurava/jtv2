import { StaticPage } from '../components/layout/StaticPage';

export function Terms() {
  return (
    <StaticPage title="Terms and Conditions">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this B2B Transaction Platform, you accept and agree to
            be bound by the terms and provision of this agreement. If you do not agree to
            these terms, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            2. Use License
          </h2>
          <p>
            Permission is granted to temporarily use this platform for business-to-business
            transactions. This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose outside intended B2B transactions</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or proprietary notations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            3. User Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and
            password. You agree to accept responsibility for all activities that occur
            under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            4. Transaction Terms
          </h2>
          <p>
            All transactions conducted through this platform are subject to verification
            and approval. We reserve the right to refuse or cancel any transaction for
            any reason.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall the B2B Platform or its suppliers be liable for any damages
            arising out of the use or inability to use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            6. Modifications
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of
            the platform following any changes indicates your acceptance of the new terms.
          </p>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </StaticPage>
  );
}
