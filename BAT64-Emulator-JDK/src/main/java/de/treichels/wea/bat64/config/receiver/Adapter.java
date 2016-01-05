package de.treichels.wea.bat64.config.receiver;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

public abstract class Adapter<T> extends XmlAdapter<Element, T> {
	private final Class<T> clazz;
	private final String prefix;
	private int index = 0;

	protected Adapter(final Class<T> clazz, final String prefix) {
		this.clazz = clazz;
		this.prefix = prefix;
	}

	@Override
	public Element marshal(final T v) throws Exception {
		final JAXBContext context = JAXBContext.newInstance(clazz);
		final Marshaller marshaller = context.createMarshaller();
		final QName tagName = new QName(String.format("%s__%02d", prefix, index++));
		final JAXBElement<T> jaxbElement = new JAXBElement<T>(tagName, clazz, v);
		final DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		final DocumentBuilder builder = dbf.newDocumentBuilder();
		final Document document = builder.newDocument();
		marshaller.marshal(jaxbElement, document);
		final Element element = document.getDocumentElement();
		return element;
	}

	@Override
	public T unmarshal(final Element v) throws Exception {
		final String tagName = v.getTagName();
		final String expexted = String.format("%s__%02d", prefix, index++);
		assert expexted.equals(tagName);

		final JAXBContext context = JAXBContext.newInstance(clazz);
		final Unmarshaller unmarshaller = context.createUnmarshaller();
		final JAXBElement<T> jaxbElement = unmarshaller.unmarshal(v, clazz);
		final T result = jaxbElement.getValue();
		return result;
	}
}