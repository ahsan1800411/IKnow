import axios from 'axios';
import { useEffect, useState } from 'react';
import { WordData } from './types/word';
import { FcSpeaker } from 'react-icons/fc';
import { useSpeechSynthesis } from 'react-speech-kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import translate from 'translate';

const translateString = async (str: string, translateTo: any = 'ja') => {
  const translated_string = await translate(str, translateTo);
  return translated_string;
};

export const Word = () => {
  const [wordsData, setData] = useState([]);
  const { speak } = useSpeechSynthesis();
  const [vocubJapanse, setVocubJapanse] = useState('');
  const [sen1Japanse, setSen1Japanse] = useState('');
  const [sen2Japanse, setSen2Japanse] = useState('');
  const [sen3Japanse, setSen3Japanse] = useState('');

  const fetchAllWords = async () => {
    try {
      const { data } = await axios('http://localhost:8000/words');
      setData(data.words);
    } catch (error) {
      console.log(error);
    }
  };

  const changeTextToJapanse = () => {
    wordsData.map((word: WordData) => {
      translateString(word.sentences[0]).then((data) => setSen1Japanse(data));
      translateString(word.sentences[1]).then((data) => setSen2Japanse(data));
      translateString(word.sentences[2]).then((data) => setSen3Japanse(data));
      translateString(word.vocabulary).then((data) => {
        setVocubJapanse(data);
      });
    });
  };
  changeTextToJapanse();

  useEffect(() => {
    fetchAllWords();
  }, []);

  const saveTextasMp3 = (text: string) => {
    speak({ text: text });
    // await axios.post('http://localhost:8000/words/save', { text });
  };

  return (
    <div className='App'>
      {wordsData?.map((word: WordData) => {
        const str = word.sentences.join(',');
        const sentences = str.split(',');

        return (
          <table
            className='table table-bordered'
            style={{ border: '1px solid lightgrey' }}
            key={word.pictureUrl}
          >
            <tbody>
              <tr>
                <td
                  style={{ padding: '0.7rem', width: '350px' }}
                  rowSpan={sentences.length}
                >
                  <p>
                    <FcSpeaker
                      size={20}
                      className='icon'
                      onClick={() => saveTextasMp3(vocubJapanse)}
                    />
                    {vocubJapanse}
                    <p className='change'>{word?.vocabulary}</p>
                  </p>
                </td>
                <td style={{ padding: '0.7rem', position: 'relative' }}>
                  <p>
                    <FcSpeaker
                      size={20}
                      className='icon'
                      onClick={() => saveTextasMp3(sen1Japanse)}
                    />
                    {sen1Japanse}
                    <p className='change'>{sentences[0]}</p>
                  </p>

                  {word.pictureUrl[0] && (
                    <img
                      src={`http://localhost:8000/${word.pictureUrl[0]}`}
                      alt='some'
                    />
                  )}
                </td>
              </tr>

              {sentences?.[1] && (
                <tr>
                  <td style={{ padding: '0.7rem', position: 'relative' }}>
                    <p>
                      <FcSpeaker
                        size={20}
                        className='icon'
                        onClick={() => saveTextasMp3(sen2Japanse)}
                      />
                      {sen2Japanse}
                      <p className='change'>{sentences[1]}</p>
                    </p>

                    {word.pictureUrl[1] && (
                      <img
                        src={`http://localhost:8000/${word.pictureUrl[1]}`}
                        alt='some'
                      />
                    )}
                  </td>
                </tr>
              )}
              {sentences?.[2] && (
                <tr>
                  <td style={{ padding: '0.7rem', position: 'relative' }}>
                    <p>
                      <FcSpeaker
                        size={20}
                        className='icon'
                        onClick={() => saveTextasMp3(sen3Japanse)}
                      />
                      {sen3Japanse}
                      <p className='change'>{sentences[2]}</p>
                    </p>
                    {word.pictureUrl[2] && (
                      <img
                        src={`http://localhost:8000/${word.pictureUrl[2]}`}
                        alt='some'
                      />
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        );
      })}
    </div>
  );
};
