package de.treichels.wea.bat64;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

public class DOMTest implements ErrorHandler {
	private static final String[] NODE_TYPES = { "Element", "Attribute", "Text", "CDATASection", "EntityReference",
			"Entity", "ProcessingInstruction", "Comment", "Document", "DocumentType", "DocumentFragment", "Notation" };
	private static int INDENT = 0;

	private static void dump(final Node node) {
		final String nodeType = NODE_TYPES[node.getNodeType() - 1];
		final String nodeName = node.getNodeName();
		final String nodeValue = node.getNodeValue();
		switch (node.getNodeType()) {
		case Node.ELEMENT_NODE:
			indent();
			System.out.printf("%s: %s ", nodeType, nodeName);

			final NamedNodeMap attributes = node.getAttributes();
			final int attributeCount = attributes.getLength();
			for (int i = 0; i < attributeCount; i++) {
				final Node attribute = attributes.item(i);
				System.out.printf("%s=\"%s\" ", attribute.getNodeName(), attribute.getNodeValue());
			}
			break;

		case Node.TEXT_NODE:
			if (nodeValue != null && nodeValue.trim().length() > 0) {
				System.out.printf("%s: %s", nodeType, nodeValue.trim());
			}
			break;
		}

		INDENT++;
		final NodeList children = node.getChildNodes();
		final int childCount = children.getLength();
		for (int i = 0; i < childCount; i++) {
			final Node child = children.item(i);
			dump(child);
		}
		INDENT--;
	}

	private static void indent() {
		int i = INDENT;

		System.out.println();
		while (--i >= 0) {
			System.out.print("   ");
		}
	}

	public static void main(final String[] args) throws Exception {
		final File file = new File(args[0]);

		final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		// factory.setNamespaceAware(true);
		factory.setIgnoringElementContentWhitespace(true);
		factory.setExpandEntityReferences(true);
		factory.setIgnoringComments(true);
		factory.setCoalescing(true);

		final DocumentBuilder builder = factory.newDocumentBuilder();
		builder.setErrorHandler(new DOMTest());

		final Document doc = builder.parse(file);

		dump(doc.getDocumentElement());
	}

	@Override
	public void error(final SAXParseException exception) throws SAXException {
		System.err.printf("URI=%s Line=%d: %s\n", exception.getSystemId(), exception.getLineNumber(),
				exception.getMessage());
	}

	@Override
	public void fatalError(final SAXParseException exception) throws SAXException {
		System.err.printf("URI=%s Line=%d: %s\n", exception.getSystemId(), exception.getLineNumber(),
				exception.getMessage());
	}

	@Override
	public void warning(final SAXParseException exception) throws SAXException {
		System.err.printf("URI=%s Line=%d: %s\n", exception.getSystemId(), exception.getLineNumber(),
				exception.getMessage());
	}
}
