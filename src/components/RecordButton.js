import React, {useState, useEffect} from 'react'

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

const grammar = '#JSGF V1.0; grammar numbers; public <number> = one | two | three | four | five | six | seven | eight| nine | ten ;'
var recognition = new SpeechRecognition()
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const RecordButton = (props) => {
    
    let[buttonClass, setButtonClass] = useState('pulsate')

    let startSpeechToText = () => {
        recognition.start()
        setButtonClass('recording-pulsate')
    }

    recognition.onresult = (event) => {
        console.log(props.type)
        var text = event.results[0][0].transcript
        var confidence = event.results[0][0].confidence
        props.setResults(text, confidence, props.type)
    }
    
    recognition.onspeechend = () => {
        recognition.stop()
        setButtonClass('pulsate')
    }

    return (
        <div class = "record-box">
            <button class = {`${buttonClass}`} type = 'button' onClick = {startSpeechToText}></button>
        </div>
    )
}

export default RecordButton