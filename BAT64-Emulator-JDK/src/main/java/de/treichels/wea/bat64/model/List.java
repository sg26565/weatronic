package de.treichels.wea.bat64.model;

import javax.xml.bind.annotation.XmlElement;

public class List<T> extends ConfigElement {
	@XmlElement(name = "_00")
	public T item0;
	@XmlElement(name = "_01")
	public T item1;
	@XmlElement(name = "_02")
	public T item2;
	@XmlElement(name = "_03")
	public T item3;
	@XmlElement(name = "_04")
	public T item4;
	@XmlElement(name = "_05")
	public T item5;
	@XmlElement(name = "_06")
	public T item6;
	@XmlElement(name = "_07")
	public T item7;
	@XmlElement(name = "_08")
	public T item8;
	@XmlElement(name = "_09")
	public T item9;
	@XmlElement(name = "_10")
	public T item10;
	@XmlElement(name = "_11")
	public T item11;
	@XmlElement(name = "_12")
	public T item12;
	@XmlElement(name = "_13")
	public T item13;
	@XmlElement(name = "_14")
	public T item14;
	@XmlElement(name = "_15")
	public T item15;

	public List() {
		super(6);
	}
}
