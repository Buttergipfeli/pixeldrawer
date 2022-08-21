import { NextPage } from "next"
import styles from './Loader.module.css';

export const Loader: NextPage = () => {
    return (
        <svg className={styles.loader} width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M250 125C250 100.277 242.669 76.1099 228.934 55.5537C215.199 34.9976 195.676 18.976 172.835 9.51506C149.995 0.0541042 124.861 -2.42131 100.614 2.40184C76.3661 7.22499 54.0932 19.1301 36.6117 36.6117C19.1301 54.0932 7.22499 76.3661 2.40184 100.614C-2.42131 124.861 0.0541045 149.995 9.51506 172.835C18.976 195.676 34.9976 215.199 55.5537 228.934C76.1099 242.669 100.277 250 125 250L125 218.75C106.458 218.75 88.3324 213.252 72.9153 202.95C57.4982 192.649 45.482 178.007 38.3863 160.877C31.2906 143.746 29.434 124.896 33.0514 106.71C36.6687 88.5246 45.5976 71.8199 58.7087 58.7087C71.8199 45.5976 88.5246 36.6687 106.71 33.0514C124.896 29.434 143.746 31.2906 160.877 38.3863C178.007 45.482 192.649 57.4982 202.95 72.9153C213.252 88.3324 218.75 106.458 218.75 125H250Z" fill="black" />
        </svg>
    )
}
