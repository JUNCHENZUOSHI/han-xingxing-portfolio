import { useI18n, useProfileData } from '../../../i18n/context';
import { profile } from '../../../data/profile';
import './Footer.css';

export default function Footer() {
  const { t } = useI18n();
  const pd = useProfileData();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* left — copyright */}
        <p className="footer__copy">&copy; 2026 {t('common.name')}</p>

        {/* center — contact identity */}
        <div className="footer__contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span className="footer__sep">·</span>
          <span>{profile.phone}</span>
          <span className="footer__sep">·</span>
          <span>{pd.location}</span>
        </div>

        {/* right — action */}
        <div className="footer__actions">
          <a href={`${import.meta.env.BASE_URL}resume.pdf`}>{t('footer.downloadResume')}</a>
        </div>
      </div>
    </footer>
  );
}
