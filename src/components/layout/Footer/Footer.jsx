import { useI18n, useProfileData } from '../../../i18n/context';
import { profile } from '../../../data/profile';
import { resumeUrl } from '../../../data/site';
import './Footer.css';

export default function Footer() {
  const { t } = useI18n();
  const pd = useProfileData();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* left — copyright */}
        <p className="footer__copy">&copy; 2026 Brantley Han</p>

        {/* center — contact identity */}
        <div className="footer__contact">
          <a href={`mailto:${profile.email}`} className="action-link">
            <svg className="footer__email-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 4.5 8 9l6-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {profile.email}
          </a>
          <span className="footer__sep">·</span>
          <span>{profile.phone}</span>
          <span className="footer__sep">·</span>
          <span>{pd.location}</span>
        </div>

        {/* right — action */}
        <div className="footer__actions">
          <a href={resumeUrl} className="action-link" download>{t('footer.downloadResume')}</a>
        </div>
      </div>
    </footer>
  );
}
