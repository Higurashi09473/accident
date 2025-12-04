import { useState, useEffect } from "react";

export default function Reccoms() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [type, setType] = useState([]);
    const [districts, setDistrict] = useState([]);
    const [source, setSource] = useState([]);

    useEffect(() => {
        fetch("http://higu.su/count/type")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setType(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    useEffect(() => {
        fetch("http://higu.su/count/district")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDistrict(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    useEffect(() => {
        fetch("http://higu.su/count/source")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSource(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    let sour = '';
    if (source.length > 0) {
        switch (source[0].district) {
            case 'mobile_app':
                sour = 'Мобильное приложение';
                break;
            case 'patrol_report':
                sour = 'Отчёт патруля';
                break;
            case 'cctv':
                sour = 'Видеонаблюдение';
                break;
            case '112_call':
                sour = 'Вызов 112';
                break;
            case 'citizen_portal':
                sour = 'Портал граждан';
                break;
            default:
                sour = 'Неизвестный источник';
        }
    }
    return (
        <div style={{ padding: '50px' }}>
            <h1>Рекомендации</h1>
            <p>
                {type.length > 0 ? `Требуется обратить внимание на данную категорию происшествий: ${type[0].district}` : 'Нет данных'}
            </p>
            <p>
                {districts.length > 0 ? `Требуется обратить внимание на ${districts[0].district} район` : 'Нет данных'}
            </p>
            <p>
                {source.length > 0 ? `Больше всего данных поступает из этого источника: ${sour}` : 'Нет данных'}
            </p>
        </div>
    )

}