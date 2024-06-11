import './styles.css';

interface CardProps {
    period?: string;
    title: string;
    description: string[];
    tags?: string[];
    thumbnail?: string;
    links?: { type: string; url: string }[];
}

const iconMap: { [key: string]: string } = {
    github: 'github.png',
    ios: 'appstore.png',
    playstore: 'play.png'
};

export default function Card({ period, title, description, tags, thumbnail, links }: CardProps) {
    return (
        <div className="experience-card p-6 rounded-lg shadow-lg mb-6 transition-colors duration-2000 hover:bg-gray-600/10 border border-gray-600/20 flex">
            <div className="header flex flex-row justify-between">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} className="thumbnail w-12 h-12 mr-4 rounded-lg" />
                ) : (
                    <div></div> 
                )}
                <div className="content">
                    <h3 className="text-md font-semibold text-slate-200">{title}</h3>
                    {description.map((paragraph, index) => (
                        <p key={index} className="text-slate-400 mt-2">
                            {paragraph}
                        </p>
                    ))}
                    <div className="tags flex flex-wrap mt-4 gap-y-2">
                        {tags && tags.map((tag, i) => (
                            <span key={i} className="tag bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2">{tag}</span>
                        ))}
                    </div>
                    <div className="links flex mt-4">
                        {links && links.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="mr-2">
                                <img src={iconMap[link.type]} alt={link.type} className="icon w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}