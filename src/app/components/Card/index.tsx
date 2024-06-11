import './styles.css';

interface CardProps {
    period: string;
    position: string;
    description: string[];
    tags?: string[];
    url?: string;
}

export default function Card({ period, position, description, tags, url }: CardProps) {
    return (
        <div className="experience-card p-6 rounded-lg shadow-lg mb-6 transition-colors duration-2000 hover:bg-gray-600/10 border border-gray-600/20 flex flex-col lg:flex-row">
            <div className="header flex flex-col lg:flex-row justify-between w-full">
                <div className="period text-slate-400 min-w-48 uppercase text-sm mb-4 lg:mb-0 lg:mr-6">{period}</div>
                <div className="content">
                    <h3 className="text-md font-semibold text-slate-200">
                        {url ? <a href={url} target="_blank" rel="noreferrer" className="hover:text-blue-500">{position}</a> : position}
                    </h3>
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
                </div>
            </div>
        </div>
    );
}