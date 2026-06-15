import { useI18n } from '../../../i18n/context';
import { profile } from '../../../data/profile';
import './Footer.css';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__contact">
          <a href={`mailto:${profile.email}`} className="text-link">{profile.email}</a>
          <span className="footer__sep">·</span>
          <span>{profile.phone}</span>
          <span className="footer__sep">·</span>
          <span>{profile.location} · {profile.status}</span>
        </div>
        <div className="footer__actions">
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="text-link">{t('footer.downloadResume')}</a>
        </div>
        <p className="footer__copy">&copy; 2026 {t('common.name')}</p>
      </div>
    </footer>
  );
}
