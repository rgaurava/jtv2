import { StaticPage } from '../components/layout/StaticPage';

export function Privacy() {
  return (
    <StaticPage title="Privacy Policy">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us, including when you
            create an account, make a transaction, or contact us for support. This may
            include your name, email address, company information, and transaction details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Protect against fraud and abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            3. Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            your personal information against unauthorized access, alteration, disclosure,
            or destruction. This includes encryption of data in transit and at rest.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            4. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal information at
            any time. You can do this through your account settings or by contacting us
            directly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            5. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@b2bplatform.com
          </p>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </StaticPage>
  );
}
