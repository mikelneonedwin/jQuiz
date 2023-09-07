import js from './js.json';
import css from './css.json';
import html from './html.json';
import php from './php.json';
import jsx from './jsx.json';
import json from './json.json';
import ts from './ts.json';
import nodejs from './nodejs.json';
import py from './py.json';
import java from './java.json';
import ruby from './ruby.json';
import dart from './dart.json';
import bash from './bash.json';

Array.prototype.shuffle = function(){
    const array = this;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        if(typeof array[i] == "object"){
            array[i].options.shuffle();
            array[j].options.shuffle();
        }
    }
    return array;
}


export const questions = () => {
    const temp = {js, css, html, php, jsx, json, ts, nodejs, py, java, ruby, dart, bash };
    for(const key in temp) temp[key] = temp[key].shuffle();
    return temp;
};

 /*
 Go
 Bash
 Fortran
 Markdown
 Visual Basic Script
 C
 C++
 SQL
 SASS
*/