export default class Create {
    static Span(text, classname, identifier) {
        const SPAN = document.createElement("span");
        SPAN.id = identifier;
        SPAN.classList.add(classname);
        SPAN.innerText = text;
        return SPAN;
    }
    static A(text, href, classname, identifier) {
        const A = document.createElement("a");
        A.id = identifier;
        A.href = href;
        A.classList.add(classname);
        A.innerText = text;
        return A;
    }
    static Li(text, classname) {
        const LI = document.createElement("li");
        LI.innerText = text;
        LI.classList.add(classname);
        return LI;
    }
    static Ul(identifier, classname) {
        const UL = document.createElement("ul");
        UL.id = identifier;
        UL.classList.add(classname);
        return UL;
    }
}