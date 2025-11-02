import { StaticPage } from '../components/layout/StaticPage';
import { Shield, Lock, Eye, Server } from 'lucide-react';

export function Security() {
  return (
    <StaticPage title="Security">
      <div className="space-y-8">
        <p className="text-lg">
          At B2B Platform, we take the security of your data seriously. We implement
          industry-standard security measures to protect your information and transactions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Data Encryption
              </h3>
            </div>
            <p>
              All data transmitted between your browser and our servers is encrypted using
              TLS 1.3. Data at rest is encrypted using AES-256 encryption.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Secure Authentication
              </h3>
            </div>
            <p>
              We use JWT-based authentication with bcrypt password hashing to ensure
              your account credentials are protected.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Privacy Protection
              </h3>
            </div>
            <p>
              We implement strict access controls and regularly audit our systems to
              ensure your data remains private and secure.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Server className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Infrastructure Security
              </h3>
            </div>
            <p>
              Our infrastructure is hosted on secure, enterprise-grade servers with
              regular backups and disaster recovery plans.
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Best Practices for Account Security
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use a strong, unique password for your account</li>
            <li>Never share your password with anyone</li>
            <li>Log out when using shared computers</li>
            <li>Keep your contact information up to date</li>
            <li>Report any suspicious activity immediately</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Report Security Issues
          </h2>
          <p>
            If you discover a security vulnerability or have concerns about the security
            of our platform, please contact us immediately at security@b2bplatform.com
          </p>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </StaticPage>
  );
}
