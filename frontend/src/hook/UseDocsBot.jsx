
import {useState} from 'react';
import {AxiosDocsBot} from '../axios/Axios';
const useDocsBot = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const teamId = 'GPzeouNdVPNSE41jvZBX';
    const botId = '7RgChIBQTRYJIIcaDtXd';
    const askQuestion = async (question) => {
        setLoading(true);
        try {
            const response = await AxiosDocsBot.post(`/teams/${teamId}/bots/${botId}/chat`, {
                question,
                full_source: false,
                format: 'text'
            });
            const newMessage = {message: response.data.answer, sources: response.data.sources};
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setLoading(false);
        } catch (error) {
            setError('Error fetching response');
            setLoading(false);
        }
    };
    return {messages, error, loading, askQuestion};
};
export default useDocsBot;