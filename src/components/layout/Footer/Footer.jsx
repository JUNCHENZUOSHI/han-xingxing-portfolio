import { useI18n, useProfileData } from '../../../i18n/context';
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

        <div className="footer__meta">
          <span>{pd.location}</span>
          <span className="footer__sep">·</span>
          <a href={resumeUrl} className="action-link" download>{t('footer.downloadResume')}</a>
        </div>
      </div>
    </footer>
  );
}
