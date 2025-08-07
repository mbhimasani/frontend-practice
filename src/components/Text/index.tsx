import styles from './text.module.css';

const Text = ({ children, type = 'title' }: { children: React.ReactNode, type?: string}) => {

  const getTextClass = (type: string) => {
    switch (type) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      default:
        return styles.title;
    }
  }

  return (
    <h1 className={getTextClass(type)}>
      {children}
    </h1>
  )
}

export default Text;